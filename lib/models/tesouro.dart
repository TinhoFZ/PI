import 'package:flutter/material.dart';

class Tesouro {
  final String nome;
  final String descricao;
  final String raride; //Talvez ENUM?
  final double valor;
  final Icon imagem; // Mudar para imagem no futuro

  const Tesouro({
    required this.nome,
    required this.descricao,
    required this.raride,
    required this.valor,
    required this.imagem,
  });
}