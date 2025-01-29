<main class="auth">
    <h2 class="auth__heading"><?php echo $titulo; ?></h2>
    <p class="auth__texto">Coloca tu nuevo password</p>

    <?php 
        REQUIRE_ONCE __DIR__ . '/../templates/alertas.php';
    ?>

    <?php if($token_valido) {?>

    <form method="POST" class="formulario">
        <div class="formulario__campo">
            <label for="password" class="formulario__label">Nuevo Password</label>
            <input
                type="password"
                class="formulario__input"
                placeholder="Tu Password"
                id="password"
                name="password">
        </div>
        <input type="submit" class="formulario__submit" value="Cambiar Password">
    </form>

    <?php }?>

    <div class="acciones">
        <a href="/login" class="acciones__enlace">Ya tienes cuenta? Inicia Sesion!</a>
        <a href="/registro" class="acciones__enlace">Aun no tienes cuenta? Registrate!</a>
    </div>
</main>