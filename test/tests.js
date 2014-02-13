var assert = chai.assert;

suite('Pruebas Unitarias', function() {
    test('HolaMundo', function() {
        entrada.value = "\"hola\", \"mundo\"";
        csv();
        assert.deepEqual(resultado.innerHTML, "\n<table class=\"center\" id=\"result\">\n<tbody><tr><td>hola</td><td>mundo</td></tr>\n</tbody></table>");
    });
    test('Compra', function() {
        entrada.value = "Producto,Precio\nLeche,\"1,5\"\nJamon,\"3\"";
        csv();
        assert.deepEqual(resultado.innerHTML, "\n<table class=\"center\" id=\"result\">\n<tbody><tr><td>Producto</td><td>Precio</td></tr>\n<tr><td>Leche</td><td>1,5</td></tr>\n<tr><td>Jamon</td><td>3</td></tr>\n</tbody></table>");
    });  
    test('Fallo', function() {
        entrada.value = "Producto,Precio Leche,\"1,5\"\nJamon,\"3\"";
        csv();
        assert.isNotNull(resultado.innerHTML.match, "<tr class=\"error\">");
    });
	
});
