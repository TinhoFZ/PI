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
            child: SizedBox(
              width: 564,
              height: 564,
              child: GridView.builder(
                padding: const EdgeInsets.only(top: 0),
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 64.0,
                  crossAxisSpacing: 64.0,
                  mainAxisExtent: 250.0,
                ),
                itemCount: 4,
                itemBuilder: (context, index) {
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
                        child: const Icon(Icons.image, size: 56),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        ),
        SizedBox(
          height: 400,
          child: Align(
            alignment: Alignment.center,
            child: 
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 48.0),
              child: Container(
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
        ),
      ],
    );
  }
}