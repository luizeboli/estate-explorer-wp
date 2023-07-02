<?php
/*
Plugin Name:  Real Estate Property
Description:  Creates logic to handle properties custom post type
Version:      1.0
Author URI:   https://www.wpbeginner.com
*/

define("POST_TYPE_NAME", "property");

class Property
{
  function __construct($property_id = null)
  {
    add_action("init", [$this, "init"], 0);
  }

  function init()
  {
    $labels = [
      "name" => "Properties",
      "singular_name" => "Property",
      "menu_name" => "Property",
      "name_admin_bar" => "Property",
      "archives" => "Property Archives",
      "attributes" => "Property Attributes",
      "parent_item_colon" => "Parent Property:",
      "all_items" => "All Properties",
      "add_new_item" => "Add New Property",
      "add_new" => "Add New",
      "new_item" => "New Property",
      "edit_item" => "Edit Property",
      "update_item" => "Update Property",
      "view_item" => "View Property",
      "view_items" => "View Properties",
      "search_items" => "Search Property",
      "not_found" => "Property not found",
      "not_found_in_trash" => "Property not found in Trash",
      "featured_image" => "Featured Image",
      "set_featured_image" => "Set featured image",
      "remove_featured_image" => "Remove featured image",
      "use_featured_image" => "Use as featured image",
      "insert_into_item" => "Insert into item",
      "uploaded_to_this_item" => "Uploaded to this item",
      "items_list" => "Properties list",
      "items_list_navigation" => "Properties list navigation",
      "item_published" => "Property published.",
      "item_updated" => "Property updated.",
      "filter_items_list" => "Filter properties list",
    ];
    $args = [
      "label" => "Property",
      "description" => "Real properties",
      "labels" => $labels,
      "supports" => ["title", "editor", "thumbnail", "custom-fields"],
      "hierarchical" => false,
      "public" => true,
      "show_ui" => true,
      "show_in_menu" => true,
      "menu_position" => 5,
      "menu_icon" => "dashicons-admin-home",
      "show_in_admin_bar" => true,
      "show_in_nav_menus" => true,
      "show_in_rest" => true,
      "can_export" => true,
      "has_archive" => true,
      "exclude_from_search" => false,
      "publicly_queryable" => true,
      "capability_type" => "page",
      "rest_base" => "properties",
      "template" => [["property/informations-block"]],
      "template_lock" => "all",
    ];

    register_post_type(POST_TYPE_NAME, $args);

    $this->register_amenities_taxonomy();
    $this->register_status_taxonomy();
    $this->remove_taxonomy_from_sidebar();
    $this->add_taxonomy_slug_to_rest_query();

    register_post_meta(POST_TYPE_NAME, "price", [
      "show_in_rest" => true,
      "single" => true,
      "type" => "number",
    ]);
    register_post_meta(POST_TYPE_NAME, "location", [
      "show_in_rest" => true,
      "single" => true,
      "type" => "string",
    ]);
    register_post_meta(POST_TYPE_NAME, "description", [
      "show_in_rest" => true,
      "single" => true,
      "type" => "string",
    ]);
  }

  function register_amenities_taxonomy()
  {
    $labels = [
      "name" => "Amenities",
      "singular_name" => "Amenity",
      "search_items" => "Search Amenities",
      "all_items" => "All Amenities",
      "edit_item" => "Edit Amenity",
      "update_item" => "Update Amenity",
      "add_new_item" => "Add New Amenity",
      "new_item_name" => "New Amenity Name",
      "menu_name" => "Amenities",
    ];

    $args = [
      "hierarchical" => false,
      "labels" => $labels,
      "show_ui" => true,
      "show_admin_column" => true,
      "show_in_rest" => true, // Needed for tax to appear in Gutenberg editor.
      "query_var" => true,
      "meta_box_cb" => false,
    ];

    register_taxonomy("amenities", [POST_TYPE_NAME], $args);
  }

  function register_status_taxonomy()
  {
    $labels = [
      "name" => "Status",
      "singular_name" => "Status",
      "search_items" => "Search Status",
      "all_items" => "All Status",
      "edit_item" => "Edit Status",
      "update_item" => "Update Status",
      "add_new_item" => "Add New Status",
      "new_item_name" => "New Status Name",
      "menu_name" => "Status",
    ];

    $args = [
      "hierarchical" => false,
      "labels" => $labels,
      "show_ui" => true,
      "show_admin_column" => true,
      "show_in_rest" => true, // Needed for tax to appear in Gutenberg editor.
      "query_var" => true,
      "meta_box_cb" => false,
    ];

    register_taxonomy("property_status", [POST_TYPE_NAME], $args);
  }

  function remove_taxonomy_from_sidebar()
  {
    add_filter(
      "rest_prepare_taxonomy",
      function ($response, $taxonomy, $request) {
        $context = !empty($request["context"]) ? $request["context"] : "view";

        // Context is edit in the editor
        if ($context === "edit" && $taxonomy->meta_box_cb === false) {
          $data_response = $response->get_data();
          $data_response["visibility"]["show_ui"] = false;
          $response->set_data($data_response);
        }

        return $response;
      },
      10,
      3
    );
  }

  function add_taxonomy_slug_to_rest_query()
  {
    add_filter(
      "rest_" . POST_TYPE_NAME . "_query",
      function (array $args, WP_REST_Request $request): array {
        // Get parameters of the query
        $params = $request->get_params();

        // Enable this feature for all of the custom taxonomies
        $custom_taxonomies = ["amenities", "property_status"];

        foreach ($custom_taxonomies as $custom_taxonomy) {
          if (isset($params["{$custom_taxonomy}_slug"])) {
            $args["tax_query"][] = [
              "taxonomy" => $custom_taxonomy,
              "field" => "slug",
              "terms" => explode(",", $params["{$custom_taxonomy}_slug"]),
            ];
          }
        }

        return $args;
      },
      10,
      2
    );
  }
}

new Property();
