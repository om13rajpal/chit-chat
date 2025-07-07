import 'package:app/components/input.dart';
import 'package:app/core/dio.dart';
import 'package:app/core/storage.dart';
import 'package:app/screens/dashboard.dart';
import 'package:app/screens/register.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final TextEditingController _username = TextEditingController();
  final TextEditingController _password = TextEditingController();

  @override
  void dispose() {
    _username.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> loginUser(BuildContext context) async {
    final dioClient = DioClient();

    final body = {
      'username': _username.text.trim(),
      'password': _password.text.trim(),
    };

    try {
      final response = await dioClient.dio.post('/user/login', data: body);
      if (response.statusCode == 200) {
        await saveToken(response.data['data']['token']);
        await saveId(response.data['data']['user']['id']);
        if (!context.mounted) return;
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => Dashboard()),
        );
      }
    } on DioException catch (e) {
      if (e.response != null) {
        print('Server error ${e.response?.data}');
      } else {
        print('Connection error ${e.message}');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: Column(
          children: [
            InputBox(controller: _username, label: 'Username', obscure: false),
            InputBox(controller: _password, label: 'Password', obscure: true),
            ElevatedButton(
              onPressed: () => loginUser(context),
              child: Text('Login'),
            ),
            ElevatedButton(
              onPressed:
                  () => Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => Register()),
                  ),
              child: Text('Register'),
            ),
          ],
        ),
      ),
    );
  }
}
