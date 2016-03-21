<?php
  if ( ! class_exists( 'Timber' ) ) {
    add_action( 'admin_notices', function() {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
      } );
    return;
  }






  function path_classes($classes) {
    global $post;
    $path = get_page_uri($post->ID);
    $parts = explode('/', 't-' . $path);
    $classes = array_merge($classes, $parts);

    return $classes;
  }
  add_filter('body_class', 'path_classes');


  register_nav_menus( array(
    'primary' => 'Primary Site Navigation',
    'blocal'  => 'BLocal Navigation'
  ) );


  class StarterSite extends TimberSite {

    function __construct() {
      // add_theme_support( 'post-formats' );
      add_theme_support( 'post-thumbnails' );
      add_theme_support( 'menus' );
      add_filter( 'timber_context', array( $this, 'add_to_context' ) );
      // add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
      add_action( 'init', array( $this, 'register_post_types' ) );
      add_action( 'init', array( $this, 'register_taxonomies' ) );
      add_filter('body_class', 'path_classes');
      parent::__construct();
    }

    function register_post_types() {
      //this is where you can register custom post types

    }

    function register_taxonomies() {
      //this is where you can register custom taxonomies
    }

    function add_to_context( $context ) {
      // $context['foo'] = 'bar';
      // $context['stuff'] = 'I am a value set in your functions.php file';
      // $context['notes'] = 'These values are available everytime you call Timber::get_context();';
      // $context['menu'] = new TimberMenu();
      // $context['site'] = $this;
      $context['primary'] = new TimberMenu('primary');
      $context['blocal'] = new TimberMenu('blocal');
      $context['option'] = get_fields('option');
      return $context;
    }

    function add_to_twig( $twig ) {
      /* this is where you can add your own fuctions to twig */
      $twig->addExtension( new Twig_Extension_StringLoader() );
      $twig->addFilter( 'myfoo', new Twig_Filter_Function( 'myfoo' ) );
      return $twig;
    }

  }

  new StarterSite();


  if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title'  => 'HopkinsLocal Settings',
        'menu_title'  => 'HopkinsLocal Settings',
        'menu_slug'   => 'hopkinslocal-settings',
        'capability'  => 'edit_posts',
        'redirect'    => false
      ));

      // acf_add_options_sub_page(array(
      //   'page_title'  => 'Theme Header Settings',
      //   'menu_title'  => 'Header',
      //   'parent_slug' => 'hopkinslocal-settings',
      // ));

      // acf_add_options_sub_page(array(
      //   'page_title'  => 'Theme Footer Settings',
      //   'menu_title'  => 'Footer',
      //   'parent_slug' => 'hopkinslocal-settings',
      // ));
    acf_add_options_page( array(
        'page_title'  => 'BLocal Settings',
        'menu_title'  => 'BLocal Settings',
        'menu_slug'   => 'blocal-settings',
        'capability'  => 'edit_posts',
        'redirect'    => false
    ) );
  }
