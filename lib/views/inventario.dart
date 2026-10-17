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
          // ISSO QUEBRA DEPENDENDO DO TAMANHO DA TELA, PRECISA DE UMA ALTURA FIXA PARA O GRIDVIEW
          child: GridView.builder(
            padding: const EdgeInsets.only(top: 48.0, left: 156.0, right: 156.0),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              mainAxisSpacing: 64.0,
              crossAxisSpacing: 64.0,
            ),
            itemCount: 4,
            itemBuilder:(context, index) {
              return InkWell(
                onTap: () {
                  // Ir para a parte do inventário clicada
                },
                child: GridTile(
                  child: Container(

                    decoration: BoxDecoration(
                      color: Colors.grey[300],
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: Icon(Icons.image, size: 56),
                  ),
                )
              );
            },
          ),
        ),
        SizedBox(
          height: 400,
          child: Align(
            alignment: Alignment.center,
            child: Container(
              // ADICIONAR WIDTH BASEADA NO TAMANHO DA TELA, OU UM PADDING
              height: 200,
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
          ),
        ),
      ],
    );
  }
}