<?php
/**
 *  Template Name: Blocal - Homepage
 *  BLocal Homepage Template
 */
  $context = Timber::get_context();
  $post = new TimberPost();
  $context['post'] = $post;
  Timber::render( 'blocal-home.twig', $context );
?>
