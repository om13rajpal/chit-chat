import 'package:app/core/dio.dart';
import 'package:app/core/storage.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({super.key});

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  Future<void> getUsers(BuildContext context) async {
    final dioClient = DioClient();
    final id = await getId();
    try {
      final response = await dioClient.dio.get("/user/all/$id");
      if (response.statusCode == 200) {
        // print(response.data['data']);
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
  void initState() {
    getUsers(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Center(child: Text('Dashboard page')));
  }
}
