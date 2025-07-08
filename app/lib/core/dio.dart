import 'package:app/core/constants.dart';
import 'package:dio/dio.dart';

class DioClient {
  final Dio dio;

  DioClient()
    : dio = Dio(
        BaseOptions(
          baseUrl: apiUrl,
          receiveTimeout: const Duration(seconds: 10),
          sendTimeout: const Duration(seconds: 10),
        ),
      ) {
    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          print('Request -> ${options.method} ${options.uri}');
          print('Data -> ${options.data}');
          return handler.next(options);
        },
        onResponse: (response, handler) {
          print('Response [${response.statusCode}] => ${response.data}');
          return handler.next(response);
        },
        onError: (error, handler) {
          print('Error -> ${error.message}');
          return handler.next(error);
        },
      ),
    );
  }
}

class DioChatClient {
  final Dio dio;
  DioChatClient()
    : dio = Dio(
        BaseOptions(
          baseUrl: chatUrl,
          receiveTimeout: const Duration(seconds: 10),
          sendTimeout: const Duration(seconds: 10),
        ),
      );
}
