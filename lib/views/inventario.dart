import 'package:flutter/material.dart';
import '../views/inventario_tesouro.dart';

class Inventario extends StatefulWidget {
  const Inventario({super.key});

  @override
  State<Inventario> createState() => _InventarioState();
}

class _InventarioState extends State<Inventario> {
  final List<Widget> _telas = [
    InventarioTesouro(), // Vestuario
    InventarioTesouro(), // Tesouros
    InventarioTesouro(), // Itens
    InventarioTesouro(), // Habilidades
  ];

  @override
  Widget build(BuildContext context) {
    final tamanhoTela = MediaQuery.sizeOf(context);
    final pixelRatio = MediaQuery.devicePixelRatioOf(context);

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
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => _telas[index],
                        ),
                      );
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