<?php
/**
 * Plugin Name: Plugin Custom
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// 1) Menampilkan form lewat shortcode [form_saya]
function bf_form() {
  if ( ! is_user_logged_in() ) {
    return '<p>Silakan login dulu.</p>';
  }

  $pesan = '';
  if ( isset( $_GET['bf_status'] ) ) {
    $status = $_GET['bf_status'] ?? '';
    $pesan  = '';
    if ( $status === 'ok' )    $pesan = '<p>Berhasil disimpan.</p>';
    if ( $status === 'error' ) $pesan = '<p>Judul tidak boleh kosong.</p>';
    if ( $status === 'gagal' ) $pesan = '<p>Gagal menyimpan, coba lagi.</p>';
  }

  ob_start(); ?>
  <?php echo $pesan; ?>
  <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
    <input type="hidden" name="action" value="bf_simpan">
    <?php wp_nonce_field( 'bf_simpan_aksi', 'bf_nonce' ); ?>
    <label>Judul catatan
      <input type="text" name="judul" required>
    </label>
    <button type="submit">Kirim</button>
  </form>
  <?php
  return ob_get_clean();
}
add_shortcode( 'form_saya', 'bf_form' );

// 2) Memproses data yang dikirim form
function bf_proses() {
  check_admin_referer( 'bf_simpan_aksi', 'bf_nonce' );

  $judul = sanitize_text_field( wp_unslash( $_POST['judul'] ?? '' ) );
  $balik = wp_get_referer() ?: home_url();

  if ( $judul === '' ) {
    wp_safe_redirect( add_query_arg( 'bf_status', 'error', $balik ) );
    exit;
  }

  // TODO: di langkah berikutnya, $judul disimpan ke database di sini.
  global $wpdb;
  $ok = $wpdb->insert(
    $wpdb->prefix . 'bf_catatan',
    [
      'user_id' => get_current_user_id(),
      'judul'   => $judul,
      'dibuat'  => current_time( 'mysql' ),
    ],
    [ '%d', '%s', '%s' ]
  );

  $status = $ok ? 'ok' : 'gagal';
  wp_safe_redirect( add_query_arg( 'bf_status', $status, $balik ) );
  exit;
}
add_action( 'admin_post_bf_simpan', 'bf_proses' );

function bf_aktivasi() {
  global $wpdb;
  $tabel   = $wpdb->prefix . 'bf_catatan';
  $charset = $wpdb->get_charset_collate();

  $sql = "CREATE TABLE $tabel (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    user_id bigint(20) unsigned NOT NULL,
    judul varchar(255) NOT NULL,
    dibuat datetime NOT NULL,
    PRIMARY KEY  (id),
    KEY user_id (user_id)
  ) $charset;";

  require_once ABSPATH . 'wp-admin/includes/upgrade.php';
  dbDelta( $sql );
}
register_activation_hook( __FILE__, 'bf_aktivasi' );

