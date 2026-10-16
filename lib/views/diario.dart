import 'package:flutter/material.dart';
import '../widgets/diario_card.dart';

class Diario extends StatelessWidget {
  const Diario({super.key});

  @override
  Widget build(BuildContext context) {
    return Column( 
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0),
          child: Text(
            'Diário',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),

        // ADICIONAR UM EXTEND PRA SIZED BOX
        Expanded(
          child: Card.outlined(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: Column(
                children: [
                  const DiarioCard(
                    imagem: 'assets/placeholder.jpg',
                    titulo: 'Título do Diário 1',
                    data: '01/01/2023',
                  ),
                  const DiarioCard(
                    imagem: 'assets/placeholder.jpg',
                    titulo: 'Título do Diário 2',
                    data: '20/05/2023',
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}