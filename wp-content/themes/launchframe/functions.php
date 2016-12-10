<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );
	return;
}

Timber::$dirname = array('templates', 'views');

require get_template_directory() . '/inc/version.php';
global $package_version;

class LaunchframeSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'init', array( $this, 'register_menus' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
    	add_action('wp_enqueue_scripts', array( $this, 'lf_cleanup'));
    	add_action( 'wp_enqueue_scripts', array( $this, 'register_stylesheets' ) );
    	add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ) );
		parent::__construct();
	}


  function lf_cleanup() {
    wp_deregister_script('jquery');
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
  }

  function register_stylesheets() {
    global $package_version;
    wp_enqueue_style( 'application-style', get_template_directory_uri() . '/assets/dist/css/application.min.css', true, $package_version );
    wp_enqueue_style( 'opensans-style', 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i', true, $package_version );
  }
  function register_scripts() {
  	global $package_version;
  	wp_enqueue_script( 'jquery-js', 'https://code.jquery.com/jquery-3.1.1.min.js', array(), $package_version, true );
  	wp_enqueue_script( 'map-js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCj9GPxSVlN4Tz8VM69DXT2f9t4faXxO-s', array('jquery-js'), $package_version, true );
    wp_enqueue_script( 'application-js', get_template_directory_uri() . '/assets/dist/js/script.min.js', array('jquery-js'), $package_version, true );
  }

	function register_post_types() {
		//Sermons
		$labels = array(
			'name'               => 'Sermons',
			'singular_name'      => 'Sermon',
			'menu_name'          => 'Sermons',
			'name_admin_bar'     => 'Sermon',
			'add_new'            => 'Add New',
			'add_new_item'       => 'Add New Sermon',
			'new_item'           => 'New Sermon',
			'edit_item'          => 'Edit Sermon',
			'view_item'          => 'View Sermon',
			'all_items'          => 'All Sermons',
			'search_items'       => 'Search Sermons',
			'parent_item_colon'  => 'Parent Sermons:',
			'not_found'          => 'No sermons found.',
			'not_found_in_trash' => 'No sermons found in Trash.'
		);
		$args = array(
			'labels'             => $labels,
	        'description'        => 'Sermons',
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'sermon' ),
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => null,
			'supports'           => array( 'title', 'editor', 'excerpt' )
		);
		register_post_type( 'sermon', $args );

		//Series
		$labels = array(
			'name'               => 'Series',
			'singular_name'      => 'Series',
			'menu_name'          => 'Series',
			'name_admin_bar'     => 'Series',
			'add_new'            => 'Add New',
			'add_new_item'       => 'Add New Series',
			'new_item'           => 'New Series',
			'edit_item'          => 'Edit Series',
			'view_item'          => 'View Series',
			'all_items'          => 'All Series',
			'search_items'       => 'Search Series',
			'parent_item_colon'  => 'Parent Series:',
			'not_found'          => 'No series found.',
			'not_found_in_trash' => 'No series found in Trash.'
		);
		$args = array(
			'labels'             => $labels,
	        'description'        => 'Series',
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'series' ),
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => null,
			'supports'           => array( 'title', 'editor', 'excerpt' )
		);
		register_post_type( 'series', $args );
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function register_menus() {
	  	register_nav_menus(
	    	array(
	      		'primary-nav' => __( 'Primary Navigation' ),
	      		'footer-nav-1' => __( 'Footer Navigation 1' ),
	      		'footer-nav-2' => __( 'Footer Navigation 2' ),
	      		'footer-nav-3' => __( 'Footer Navigation 3' )
	    	)
	  	);
	}

	function add_to_context( $context ) {
		$context['primaryNav'] = new TimberMenu('primary-nav');
		$context['footerNav1'] = new TimberMenu('footer-nav-1');
		$context['footerNav2'] = new TimberMenu('footer-nav-2');
		$context['footerNav3'] = new TimberMenu('footer-nav-3');
		$context['site'] = $this;
		return $context;
	}
}

function bible_plan(){
    $bible_plan = "<div class=\"bible-content\">
    <link rel=\"stylesheet\" href=\"http://therocc.com/wp-content/uploads/assets/oneyearbible/styles.css\" type=\"text/css\" media=\"all\">
    <h1>One Year Bible</h1>";

    $bibleReadingPlan = simplexml_load_file("http://therocc.com/wp-content/uploads/assets/oneyearbible/bible.xml");
	
    foreach ($bibleReadingPlan->month as $month) {
    	$bible_plan .= "<div id=\"" . $month["ofYear"] . "\" class=\"three-quarters\" style=\"display: none;\">";
    	$bible_plan .= "<h3>" . $month["ofYear"] . "</h3>";
    	$bible_plan .= "<table width=\"460\">";
    	$bible_plan .= "<tbody>";
    	foreach ($month->day as $day) {
    		$bible_plan .= "<tr>";
    		$bible_plan .= "<td class=\"date\">" . $day["ofMonth"] . "</td>";
    		$bible_plan .= "<td>";
    		foreach ($day->reference as $reference) {
    			$bible_plan .= $reference . "<br />";
    		}
    		$bible_plan .= "</td>";
    		$bible_plan .= "</tr>";
    	}
    	$bible_plan .= "</tbody>";
    	$bible_plan .= "</table>";
    	$bible_plan .= "</div>";
    }
    $bible_plan .=
   		"<div id=\"sub-nav\" class=\"one-quarter\">
		    <ul>
		        <li><a href=\"#!\" onclick=\"showPlan('January')\">January</a></li>
		        <li><a href=\"#!\" onclick=\"showPlan('February')\">February</a></li>
		        <li><a href=\"#!\" onclick=\"showPlan('March')\">March</a></li>
		        <li><a href=\"#!\" onclick=\"showPlan('April')\">April</a></li>
		        <li><a href=\"#!\" onclick=\"showPlan('May')\">May</a></li>
		        <li><a href=\"#!\" onclick=\"showPlan('June')\">June</a></li>
		        <li><a href=\"#!\" onclick=\"showPlan('July')\">July</a></li>
		        <li><a href=\"#!\" onclick=\"showPlan('August')\">August</a></li>
		        <li><a href=\"#!\" onclick=\"showPlan('September')\">September</a></li>
		        <li><a href=\"#!\" onclick=\"showPlan('October')\">October</a></li>
		        <li><a href=\"#!\" onclick=\"showPlan('November')\">November</a></li>
		        <li><a href=\"#!\" onclick=\"showPlan('December')\">December</a></li>
		    </ul>
		</div>
		<script>
			function showPlan(month) {
			    jQuery('.three-quarters').hide();
	            jQuery('#' + month).show();
	        };
		</script>
		</div>";
    
    return $bible_plan;
} 
add_shortcode('bible_plan', 'bible_plan');

if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();	
}

add_filter( 'timber_context', 'mytheme_timber_context'  );

function mytheme_timber_context( $context ) {
    $context['options'] = get_fields('option');
    return $context;
}

new LaunchframeSite();
