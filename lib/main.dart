import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

import 'package:flutter/material.dart';
import 'widgets/bottom_nav_bar.dart';
import 'widgets/app_bar.dart';
import 'views/mapa.dart';
import 'views/diario.dart';
import 'views/inventario.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

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
          Mapa(),

          Diario(),
          
          Inventario(),
          
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