import 'package:flutter/material.dart';
import 'views/diario.dart';
import 'widgets/bottom_nav_bar.dart';
import 'widgets/app_bar.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int currentPageIndex = 0;

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'STOG',
      home: Scaffold(
        appBar: AppBarWidget(),
        bottomNavigationBar: BottomNavBar(
          currentPageIndex: currentPageIndex,
          onDestinationSelected: (int index) {
            setState(() {
              currentPageIndex = index;
            });
          },
        ),

        body: <Widget> [
          // Mapa
          Stack(
            children: [
              Image.asset(
                'assets/placeholder.jpg',
                fit: BoxFit.fill,
                width: double.infinity,
                height: double.infinity,
              ),
            ],
          ),

          Diario(),
          
          // Inventário
          Card(
            child: const Text('Conteúdo da página 3'),
          ),
          
          // Mapa ancestral
          Card(
            child: const Text('Conteúdo da página 4'),
          ),

          // Perfil
          Card(
            child: const Text('Conteúdo da página 5'),
          ),
        ][currentPageIndex]
      ),       
    );
  }
}