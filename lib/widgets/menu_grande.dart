import 'package:flutter/material.dart';

class MenuGrande extends StatelessWidget {
  final Widget child;

  const MenuGrande({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
    margin: EdgeInsets.zero,
    decoration: const BoxDecoration(
      color: Colors.white,
      border: Border(
        top: BorderSide(
          color: Colors.grey,
          width: 1.0,
        ),
      ),
      borderRadius: BorderRadius.only(
        topLeft: Radius.circular(16),
        topRight: Radius.circular(16),
      ),
    ),
    child: child,
    );
  }

}