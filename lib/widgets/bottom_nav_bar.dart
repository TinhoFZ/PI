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
    return Container(     
      decoration: BoxDecoration(
        color: Colors.transparent,
        boxShadow: [
          BoxShadow(
            color: Colors.black,
            offset: Offset(0, 2),
            blurRadius: 4,
            blurStyle: BlurStyle.solid,
          ),
        ],
      ),

      child: NavigationBar(
        selectedIndex: widget.currentPageIndex,
        onDestinationSelected: widget.onDestinationSelected,

        destinations: const <NavigationDestination>[
          NavigationDestination(
            icon: Icon(
              Icons.location_on,
              size: 36,  
            ),
            label: 'Mapa',
          ),
          NavigationDestination(
            icon: Icon(
              Icons.book,
              size: 36,
            ),
            label: 'Diário',
          ),
          NavigationDestination(
            icon: Icon(
              Icons.backpack,
              size: 36,
            ),
            label: 'Inventário',
          ),
          NavigationDestination(
            icon: Icon(
              Icons.map,
              size: 36,
            ),
            label: 'Mapa ancestral',
          ),
          NavigationDestination(
            icon: Icon(
              Icons.person,
              size: 36,
            ),
            label: 'Perfil',
          ),
        ],
      ),
    );
  }
}