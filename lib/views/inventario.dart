import 'dart:math' as math;

import 'package:flutter/material.dart';
import '../views/inventario_tesouro.dart';

class Inventario extends StatefulWidget {
  const Inventario({super.key});

  @override
  State<Inventario> createState() => _InventarioState();
}

class _InventarioState extends State<Inventario> {
  final List _telas = [
    (acao: InventarioTesouro(), imagem: "assets/placeholder.jpg"), // Vestuario
    (acao: InventarioTesouro(), imagem: "assets/primeiro_tesouro.png"), // Tesouros
    (acao: InventarioTesouro(), imagem: "assets/placeholder.jpg"), // Itens
    (acao: InventarioTesouro(), imagem: "assets/placeholder.jpg"), // Habilidades
  ];

  @override
  Widget build(BuildContext context) {

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 24.0, bottom: 28.0),
          child: Text(
            'Inventário',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        Expanded(
          flex: 6,
          child: LayoutBuilder(
            builder: (context, constraints) {

              const padding = 24.0;
              const spacing = 24.0;

              final widthDisponivel = constraints.maxWidth - padding * 2;
              final heightDisponivel = constraints.maxHeight - padding * 2;

              final tamanhoBloco = math.min(
                (widthDisponivel - spacing) / 2,
                (heightDisponivel - spacing) / 2,
              );

              return GridView.builder(
                padding: const EdgeInsets.all(padding),
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: spacing,
                  crossAxisSpacing: spacing,
                  mainAxisExtent: tamanhoBloco,
                ),
                itemCount: 4,
                itemBuilder: (context, index) {
                  return InkWell(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => _telas[index].acao,
                        ),
                      );
                    },
                    child: GridTile(
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.grey[300],
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                        child: Image.asset(_telas[index].imagem),
                      ),
                    ),
                  );
                },
              );
            },
          ),
        ),
        Expanded(
          flex: 4,
          child: Align(
            alignment: Alignment.center,
            child: LayoutBuilder(
              builder: (context, constraints) {
                return Center(
                  child: Container(
                    width: constraints.maxWidth * 0.8,
                    height: constraints.maxHeight * 0.8,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(
                        color: Colors.grey,
                        width: 1.0,
                      ),
                      borderRadius: BorderRadius.circular(8.0),
                    ),

                    child: Center(
                      child: Text('Informações do inventário'),
                    ),
                  ),
                );
              },
            ),
          ),
        ),
      ],
    );
  }
}