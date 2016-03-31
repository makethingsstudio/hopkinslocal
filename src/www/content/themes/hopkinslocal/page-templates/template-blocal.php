<?php
/**
 *  Template Name: Blocal - Homepage
 *  BLocal Homepage Template
 */
  $context = Timber::get_context();
  $post = new TimberPost();
  $context['post'] = $post;

  $successArgs = array(
    'post_type' => array(
      'post'
    ),
    'meta_query' => array(
      array(
        'key'     => 'showcase',
        'value'   => serialize( strval( $post->ID ) ),
        'compare' => 'LIKE'
      )
    )
  );


  $partnerArgs = array(
    'post_type' => array(
      'partner'
    ),
    'posts_per_page' => -1
  );


  $context['successStories'] = Timber::get_posts( $successArgs );

  $context[ 'partners' ] = Timber::get_posts( $partnerArgs );

  Timber::render( 'blocal-home.twig', $context );
?>
