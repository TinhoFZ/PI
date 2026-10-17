import 'package:flutter/material.dart';
import '../widgets/diario_card.dart';
import '../widgets/menu_grande.dart';

class Diario extends StatelessWidget {
  const Diario({super.key});

  @override
  Widget build(BuildContext context) {
    return Column( 
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 24.0, bottom: 48.0),
          child: Text(
            'Diário',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),

        Expanded(
          child: MenuGrande(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: Column(
                spacing: 16.0,
                children: [
                  Padding(
                    padding: EdgeInsets.only(top: 32.0),
                      child: const DiarioCard(
                        imagem: 'assets/placeholder.jpg',
                        titulo: 'Título do Diário 1',
                        data: '01/01/2023',
                      ),                
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