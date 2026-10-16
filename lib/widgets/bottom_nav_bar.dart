import 'package:flutter/material.dart';

class BottomNavBar extends StatefulWidget {
  final int currentPageIndex;
  final ValueChanged<int> onDestinationSelected;

  const BottomNavBar({
    super.key,
    required this.currentPageIndex,
    required this.onDestinationSelected,
  });

  @override
  State<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends State<BottomNavBar> {

  @override
  Widget build(BuildContext context) {
    return NavigationBar(
      selectedIndex: widget.currentPageIndex,
      onDestinationSelected: widget.onDestinationSelected,
      shadowColor: Colors.black,
      elevation: 3.0,

      destinations: const <NavigationDestination>[
        NavigationDestination(
          icon: Icon(Icons.location_on),
          label: 'Mapa',
        ),
        NavigationDestination(
          icon: Icon(Icons.book),
          label: 'Diário',
        ),
        NavigationDestination(
          icon: Icon(Icons.backpack),
          label: 'Inventário',
        ),
        NavigationDestination(
          icon: Icon(Icons.map),
          label: 'Mapa ancestral',
        ),
        NavigationDestination(
          icon: Icon(Icons.person),
          label: 'Perfil',
        ),
      ],
    );
  }
}