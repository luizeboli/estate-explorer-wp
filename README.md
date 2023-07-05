# Estate Explorer

This is the `wp-content` folder of the [Estate Explorer](https://github.com/luizeboli/nextjs-wordpress-study) frontend. 

This repository is a proof of concept for building an application using Wordpress as a Headless CMS. Using some of the key functionalities of the tool. These include custom post types, taxonomies, custom fields, and a bit of Gutenberg.

It was my first experience with WordPress and PHP, so there might be some anti-patterns and implementations that are not done in the correct way. The intention was not to do things perfectly, but rather to get things done.

## Get Started

I used [Local](https://localwp.com/) for the development, so I'll assume that you're also familiar with it.

- Web Server: nginx
- PHP Version: 8.1.9
- Database: MySQL 8.0.16
- Wordpress Version: 6.2.2

1. Download and install [Local](https://localwp.com/)
2. Setup your site using the configs listed above
3. Clone or [download](https://github.com/luizeboli/wordpress-study/archive/refs/heads/main.zip) this repository
4. Move everything to the `wp-content` folder of your site
5. Navigate to the `plugins/informations-block` folder and run `npm start`.
6. Start your site
7. Add some property taxonomies (this will be required as taxonomies are required when adding properties)

## What we have?

The idea of the application is to be a list of properties for a real estate agency, so I needed to create a custom post type called "property."

All the configuration for this post type is in [mu-plugins/real-estate-property.php](./mu-plugins/real-estate-property.php) file. I decided to create it in the `mu-plugins` directory instead of the `plugins` to prevent the user from disabling it and potentially breaking the application. I think I could have also configured everything in a theme, but based on my studies, themes should define the visual aspects and not the logic. That's why I chose to create a plugin.

### Taxonomies

We'll need to search for properties, so I added some taxonomies. Additionally, to make things easier for the frontend I added a filter to the REST API, allowing us to search by the taxonomy slug.

### Post Meta

I also added some meta fields to the post type so we can better describe and organize it.

### Gutenberg Block

I believe the idea of using WordPress as a headless CMS along with Gutenberg is to allow users to dynamically build their pages and then render those same blocks on the frontend. I didn't get around to implementing this functionality as I wanted to get the project done.

Therefore, the block I created with Gutenberg was only meant to facilitate the filling of property information, such as metadata and taxonomies. Even so, I was able to learn a bit about the WordPress/Gutenberg APIs, such as hooks, stores, posts, taxonomies, etc.

### Theme

I used the [intentionally blank](https://wordpress.org/themes/intentionally-blank/) theme with a [child theme](./themes/child-blank/functions.php) to disable some of the default post links/menus on the interface.

Later on, I realized that using this theme is unnecessary (in terms of a blank page) since I'm using the [Headless Mode](https://wordpress.org/plugins/headless-mode/) plugin, which automatically redirects requests to our frontend URL.