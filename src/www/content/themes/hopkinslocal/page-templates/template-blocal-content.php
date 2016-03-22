<?php
/**
 *  Template Name: Blocal - Content
 *  BLocal Content Template
 */
  $context = Timber::get_context();
  $post = new TimberPost();
  $context['post'] = $post;



  Timber::render( 'blocal-content.twig', $context );
?>
