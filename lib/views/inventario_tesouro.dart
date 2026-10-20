import 'package:flutter/material.dart';
import '../widgets/menu_grande.dart';
import '../models/tesouro.dart';

class InventarioTesouro extends StatefulWidget {
  const InventarioTesouro({super.key});

  @override
  State<InventarioTesouro> createState() => _InventarioTesouroState();
}

class _InventarioTesouroState extends State<InventarioTesouro> {

  List<Tesouro> tesouros = [
    Tesouro(nome: "Tesouro 1", descricao: "O primeiro tesouro a ser criado!", raride: "único", valor: 100, imagem: Icon(Icons.star, size: 36,)),
    Tesouro(nome: "Tesouro 2", descricao: "O segundo tesouro a ser criado!", raride: "comum", valor: 10, imagem: Icon(Icons.image, size: 36,)),
    Tesouro(nome: "Tesouro 3", descricao: "O terceiro tesouro a ser criado!", raride: "comum", valor: 10, imagem: Icon(Icons.image, size: 36,)),
    Tesouro(nome: "Tesouro 4", descricao: "O quarto tesouro a ser criado!", raride: "comum", valor: 10, imagem: Icon(Icons.image, size: 36,)),
    Tesouro(nome: "Tesouro 5", descricao: "O quinto tesouro a ser criado!", raride: "comum", valor: 10, imagem: Icon(Icons.image, size: 36,)),
  ];

  Tesouro? tesouroSelecionado;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 24.0),
            child: tesouroSelecionado == null
            ? const Text(
              'Selecione algo para aparecer aqui!',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
              )
            )
            : Padding(
                padding: EdgeInsetsGeometry.symmetric(horizontal: 16),
                child: Card.outlined(
                  margin: EdgeInsets.zero,
                  child: Row(
                    children: [
                      tesouroSelecionado!.imagem,
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              tesouroSelecionado!.nome,
                              style: TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(height: 4),
                            Text(
                              tesouroSelecionado!.descricao,
                              style: TextStyle(fontSize: 16),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
          ),
          Expanded(
            child: MenuGrande(
              child: Padding(
                padding: EdgeInsetsGeometry.fromLTRB(16, 32, 16, 0),
                child: GridView.builder(
                  itemCount: tesouros.length,
                  gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                    maxCrossAxisExtent: 200.0,
                    crossAxisSpacing: 24,
                    mainAxisSpacing: 24,
                    childAspectRatio: 1,
                  ),
                  itemBuilder: (BuildContext context, int index) {
                    final tesouro = tesouros[index];
                    return InkWell(
                      onTap: (){
                        // Mostrar tesouro no lugar do texto de inventário
                        setState(() {
                          tesouroSelecionado = tesouro;
                        });
                      },
                      child: GridTile(
                        child: Container(
                          decoration: BoxDecoration(
                            color: Colors.grey[300],
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                          child: tesouro.imagem,
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}