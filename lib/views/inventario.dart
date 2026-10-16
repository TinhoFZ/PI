import 'package:flutter/material.dart';

class Inventario extends StatelessWidget {
  const Inventario({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 24.0),
          child: Text(
            'Inventário',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        Expanded(
          child: Center(
            child: Text('Escolhes de inventário'),
          ),
        ),
        Expanded(
          child: Center(
            child: Text('Informações do inventário'),
          ),
        ),
      ],
    );
  }
}