<?php
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
function my_theme_enqueue_styles() {
  wp_enqueue_style( 'child-style',
    get_stylesheet_uri(),
    array( 'intentionally-blank' ),
    wp_get_theme()->get( 'Version' )
  );
}

// ************* Remove default posts, comments and upload type *************
// Remove side menu
add_action( 'admin_menu', 'remove_default_post_type' );
function remove_default_post_type() {
  remove_menu_page( 'edit.php' );
  remove_menu_page( 'edit-comments.php' );
  remove_menu_page( 'upload.php' );
}

// Remove in top Admin Menu Bar
add_action( 'admin_bar_menu', 'remove_default_post_type_menu_bar', 999 );
function remove_default_post_type_menu_bar( $wp_admin_bar ) {
  $wp_admin_bar->remove_node( 'new-post' );
  $wp_admin_bar->remove_node( 'comments' );
}

// Remove Quick Draft Dashboard Widget
add_action( 'wp_dashboard_setup', 'remove_draft_widget', 999 );
function remove_draft_widget(){
  remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
}