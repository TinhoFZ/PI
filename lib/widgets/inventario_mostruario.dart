import 'package:flutter/material.dart';

class InventarioMostruario extends StatefulWidget {
  final Object? selecionado;
  final String? nome;
  final String? imagem;
  final String? descricao;
  final String? extra;

  const InventarioMostruario({
    super.key,
    this.selecionado,
    this.nome,
    this.imagem,
    this.descricao,
    this.extra,
  });

  @override
  State<InventarioMostruario> createState() => _InventarioSubmenuState();
}

class _InventarioSubmenuState extends State<InventarioMostruario> {

  @override
  Widget build(BuildContext context) {
    final widthTela = MediaQuery.sizeOf(context).width;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 24.0),
      child: Center(
        child: widget.selecionado == null
        ? const Text(
          'Selecione algo para aparecer aqui!',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          )
        )
        : SizedBox( 
            width: widthTela * 0.9,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Image.asset(
                  widget.imagem ?? '',
                  height: 150,
                  width: 150,
                ),
                SizedBox(width: 8,),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        widget.nome ?? '',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      if (widget.extra != null)
                        Text(
                          widget.extra ?? '',
                          style: TextStyle(
                            fontSize: 20,
                          ),
                        ),
                      Text(
                        widget.descricao ?? '',
                        softWrap: true,
                        style: TextStyle(
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
      ),
    );
  }
}