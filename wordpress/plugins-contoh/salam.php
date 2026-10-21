<?php
/**
 * Plugin Name: Simpel salam
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function bf_salam() {
  if ( is_user_logged_in() ) {
    $user = wp_get_current_user();
    return '<p>Halo, ' . esc_html( $user->display_name ) . '!</p>';
  }
  return '<p>Halo, tamu. Silakan login.</p>';
}
add_shortcode( 'salam', 'bf_salam' );