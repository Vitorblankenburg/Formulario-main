<?php
    include("index.php");

    $nome=$_POST['nome'];
    $sobrenome=$_POST['sobrenome'];
    $email=$_POST['email'];
    $cpf=$_POST['cpf'];
    $cep=$_POST['cep'];
    $convenio=$_POST['convenio'];
    $sql="INSERT INTO cadastro(nome, sobrenome, email,  cpf, cep, convenio) VALUES ('$nome', '$sobrenome', '$email', '$cpf', $cep', '$convenio')";

    if(mysqli_query($conexao, $sql)){
        echo "Usuario cadastrado com sucesso";
    }
    mysqli_close($conexao);
?>