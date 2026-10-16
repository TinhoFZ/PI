import 'package:flutter/material.dart';

class AppBarWidget extends StatelessWidget implements PreferredSizeWidget {

  const AppBarWidget({super.key});

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight + 10);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      centerTitle: true,
      shadowColor: Colors.black,
      elevation: 3.0,
      leadingWidth: 64,

      title: Text("STOG",
        style: TextStyle(
          fontWeight: FontWeight.bold,
        ),
      ),
      leading: Padding(
        padding: const EdgeInsets.only(left: 8.0, top: 8.0),
        child: IconButton.outlined(
          visualDensity: VisualDensity.compact,
          style: OutlinedButton.styleFrom(
            shape: CircleBorder(
            ),
          ),
          icon: const Icon(
            Icons.menu,
            size: 36,
          ),
          onPressed: () {
            // ADICIONAR AÇÃO PARA ABRIR O MENU LATERAL AQUI
          },
        ),
      ),
      actions: [
        Padding(
          padding: const EdgeInsets.only(right: 8.0, top: 8.0),
          child: IconButton.outlined(
            icon: const Icon(
              Icons.menu_book,
              size: 36,
            ),
            onPressed: () {
              // ADICIONAR AÇÃO PARA ABRIR O MENU DE MISSÕES AQUI
            },
          ),
        ),
      ],
    );
  }
}