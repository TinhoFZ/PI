import 'package:flutter/material.dart';
import '../models/tesouro.dart';
import '../widgets/menu_grande.dart';
import '../widgets/inventario_mostruario.dart';

class InventarioTesouro extends StatefulWidget {
  const InventarioTesouro({super.key});

  @override
  State<InventarioTesouro> createState() => _InventarioTesouroState();
}

class _InventarioTesouroState extends State<InventarioTesouro> {

  List<Tesouro> tesouros = [
    Tesouro(nome: "Primeiro tesouro", descricao: "O primeiro tesouro a ser criado!", raride: "único", valor: 100, imagem: "assets/primeiro_tesouro.png"),
    Tesouro(nome: "Tesouro 2", descricao: "O segundo tesouro a ser criado!", raride: "comum", valor: 10, imagem: "assets/placeholder.jpg"),
    Tesouro(nome: "Tesouro 3", descricao: "O terceiro tesouro a ser criado!", raride: "comum", valor: 10, imagem: "assets/placeholder.jpg"),
    Tesouro(nome: "Tesouro 4", descricao: "O quarto tesouro a ser criado!", raride: "comum", valor: 10, imagem: "assets/placeholder.jpg"),
    Tesouro(nome: "Tesouro 5", descricao: "O quinto tesouro a ser criado!", raride: "comum", valor: 10, imagem: "assets/placeholder.jpg"),
  ];

  Tesouro? tesouroSelecionado;

  @override
  Widget build(BuildContext context) {
    return Scaffold( 
      appBar: AppBar(),
      body: Column(
        children: [
          Expanded(
            flex: 3,
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 24.0),
              child: InventarioMostruario(
                selecionado: tesouroSelecionado, 
                nome: tesouroSelecionado?.nome, 
                imagem: tesouroSelecionado?.imagem, 
                descricao: tesouroSelecionado?.descricao,
              ),
            ),
          ),
          Expanded(
            flex: 7,
            child: MenuGrande(
              child: Padding(
                padding: EdgeInsetsGeometry.fromLTRB(16, 32, 16, 0),
                child: GridView.builder(
                  itemCount: tesouros.length,
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
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
                          child: Image.asset(tesouro.imagem),
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