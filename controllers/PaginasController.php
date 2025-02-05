<?php

namespace Controllers;

use Model\Usuario;
use MVC\Router;

class PaginasController {

    public static function index(Router $router) {
        $router->render('paginas/index', [
            'titulo' => 'Inicio'
        ]);
    }

    public static function sobreNosotros(Router $router) {
        $router->render('paginas/sobre-nosotros', [
            'titulo' => 'Acerca de EventConnect'
        ]);
    }

    public static function pases(Router $router) {
        $router->render('paginas/pases', [
            'titulo' => 'Pases EventConnect'
        ]);
    }

    public static function conferencias(Router $router) {
        $router->render('paginas/conferencias', [
            'titulo' => 'Workshops & Conferencias'
        ]);
    }
}