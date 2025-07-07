import 'package:app/core/storage.dart';
import 'package:app/screens/dashboard.dart';
import 'package:app/screens/login.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/adapters.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Hive.initFlutter();
  final token = await getToken();
  runApp(ProviderScope(child: ChitChat(token: token)));
}

class ChitChat extends StatelessWidget {
  final String? token;
  const ChitChat({super.key, required this.token});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Colors.black,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: (token != null) ? Dashboard() : Login(),
    );
  }
}
