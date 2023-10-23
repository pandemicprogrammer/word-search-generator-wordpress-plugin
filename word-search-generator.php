<?php
/*
Plugin Name: Word Search Generator
Description: Create custom word search puzzles and printables.
Version: 1.0
Author: Marine Valentonis
*/

function enqueue_word_search_assets()
{
    // Use the correct URL for your CSS file
    wp_enqueue_style('word-search-css', plugin_dir_url(__FILE__) . 'css/style.css');
    wp_enqueue_script('word-search-js', plugin_dir_url(__FILE__) . 'js/script.js', array('jquery'), '1.1', true);
}

add_action('wp_enqueue_scripts', 'enqueue_word_search_assets');

// Activation Hook
register_activation_hook(__FILE__, 'word_search_activate');

function word_search_activate()
{
    // Add activation tasks here, if needed
    // For example, you can create database tables or set default options
}

// Deactivation Hook
register_deactivation_hook(__FILE__, 'word_search_deactivate');

function word_search_deactivate()
{
    // Add deactivation tasks here, if needed
    // For example, you can clean up any resources or options used by the plugin
}


function word_search_shortcode($atts)
{
    ob_start(); // Start output buffering
?>

    <body>
        <h1>Word Search Generator</h1>
        <form id="wordSearchForm">
            <!-- <label for="gridSize">Grid Size (X by X):</label>
            <input type="number" id="gridSize" name="gridSize" required> -->
            <!-- <label for="words">Words (comma-separated):</label>
            <input type="text" id="words" name="words" required> -->
            <input type="submit" value="Generate Word Search">
        </form>
        <div id="wordSearchGrid"></div>

    </body>

    </html>
<?php
    return ob_get_clean(); // Return the buffered content
}

add_shortcode('word_search', 'word_search_shortcode');
