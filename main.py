from django.http import JsonResponse
import traceback

def execute_code(request):
    if request.method == 'POST':
        code = request.POST.get('code', '')

        try:
            # Execute o código Python
            exec_result = {}
            exec(code, {}, exec_result)
            output = exec_result.get('output', '')

            return JsonResponse({'output': output})
        except Exception as e:
            # Captura qualquer exceção que ocorra durante a execução do código
            return JsonResponse({'error': str(e), 'traceback': traceback.format_exc()})

    return JsonResponse({'error': 'Método não permitido'}, status=405)
