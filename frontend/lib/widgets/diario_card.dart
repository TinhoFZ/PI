import 'package:flutter/material.dart';

class DiarioCard extends StatelessWidget {
  final String imagem;
  final String titulo;
  final String data;

  const DiarioCard({
    required this.imagem,
    required this.titulo,
    required this.data,
    super.key
  });

  @override
  Widget build(BuildContext context) {
    return Container(
    constraints: BoxConstraints(
      minWidth: 200,
      maxWidth: 800,
    ),
    child: Card.outlined(
      margin: EdgeInsets.zero,
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Image.asset(
              imagem,
              width: 100,
              height: 100,
              fit: BoxFit.cover,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  titulo,
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  data,
                  style: TextStyle(fontSize: 16),
                ),
              ],
            ),
          ),
          
        ],
      ),
    ),
    );
  }
}