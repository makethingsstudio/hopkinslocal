<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/views/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();


$post = new TimberPost();
$context['post'] = $post;


$templates = array( 'page-' . $post->post_name . '.twig', 'page.twig' );

if ( is_front_page() ) {
  $focusIds = array(14, 16, 18);
  $context['focuses'] = Timber::get_posts($focusIds);
  $args = array(
    'post_type' => 'post',
    'meta_key' => 'homepage',
    'meta_value' => 1
  );
  $context['posts'] = Timber::get_posts($args);
  array_unshift( $templates, 'home.twig' );
} else {
  $args = array(
    'post_type' => array(
        'post'
      ),
      'meta_query' => array(
        array(
          'key' => 'showcase',
          'value' => serialize(strval($post->ID)),
          'compare' => 'LIKE'
        )
      )
  );
  $context['stories'] = Timber::get_posts( $args );
}

Timber::render( $templates, $context );
