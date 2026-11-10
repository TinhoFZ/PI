import 'package:flutter/material.dart';
import '../models/item.dart';
import '../widgets/inventario_mostruario.dart';
import '../widgets/menu_grande.dart';


class InventarioItem extends StatefulWidget {
  const InventarioItem({super.key});

  @override
  State<InventarioItem> createState() => _InventarioItemState();
}

class _InventarioItemState extends State<InventarioItem> {

  List<Item> itens = [
    Item(nome: "Primeiro item", descricao: "Primeiro item a ser criado", tipo: "movimento", imagem: "assets/primeiro_item.png"),
    Item(nome: "Item 2", descricao: "Segundo item a ser criado", tipo: "exploração", imagem: "assets/placeholder.jpg"),
    Item(nome: "Item 3", descricao: "Terceiro item a ser criado", tipo: "exploração", imagem: "assets/placeholder.jpg"),
  ];

  Item? itemSelecionado;

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
                selecionado: itemSelecionado, 
                nome: itemSelecionado?.nome, 
                imagem: itemSelecionado?.imagem, 
                descricao: itemSelecionado?.descricao,
              ),
            ),
          ),
          Expanded(
            flex: 7,
            child: MenuGrande(
              child: Padding(
                padding: EdgeInsetsGeometry.fromLTRB(16, 32, 16, 0),
                // ITEMS VÃO TER UM LIMITE FIXO POSSÍVEL OBTÍVEL
                child: GridView.builder(
                  itemCount: itens.length,
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 24,
                    mainAxisSpacing: 24,
                    childAspectRatio: 1,
                  ),
                  itemBuilder: (BuildContext context, int index) {
                    final item = itens[index];
                    return InkWell(
                      onTap: (){
                        // Mostrar tesouro no lugar do texto de inventário
                        setState(() {
                          itemSelecionado = item;
                        });
                      },
                      child: GridTile(
                        child: Container(
                          decoration: BoxDecoration(
                            color: Colors.grey[300],
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                          child: Image.asset(item.imagem),
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