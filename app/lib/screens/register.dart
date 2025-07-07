import 'package:app/components/input.dart';
import 'package:app/core/dio.dart';
import 'package:app/screens/login.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

class Register extends StatefulWidget {
  const Register({super.key});

  @override
  State<Register> createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  TextEditingController _emailController = TextEditingController();
  TextEditingController _usernameController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();

  Future<void> registerUser(BuildContext context) async {
    final dioClient = DioClient();

    final body = {
      'email': _emailController.text.trim(),
      'username': _usernameController.text.trim(),
      'password': _passwordController.text.trim(),
    };

    try {
      final response = await dioClient.dio.post('/user/register', data: body);
      if (!context.mounted) return;
      if (response.statusCode == 201) {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => Login()),
        );
      }
    } on DioException catch (e) {
      if (e.response != null) {
        print('Server error: ${e.response?.data}');
      } else {
        print('Connection error: ${e.message}');
      }
    }
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: Column(
                spacing: 10,
                children: [
                  InputBox(
                    controller: _usernameController,
                    label: 'Username',
                    obscure: false,
                  ),
                  InputBox(
                    controller: _emailController,
                    label: 'Email',
                    obscure: false,
                  ),
                  InputBox(
                    controller: _passwordController,
                    label: 'Password',
                    obscure: true,
                  ),
                  ElevatedButton(
                    onPressed: () => registerUser(context),
                    child: Text('Register'),
                  ),
                  ElevatedButton(
                    onPressed:
                        () => Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => Login()),
                        ),
                    child: Text('Login'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
