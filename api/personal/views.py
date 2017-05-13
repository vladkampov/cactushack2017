from django.contrib.auth import get_user_model

from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"


class RegisterView(APIView):
    authentication_classes = []

    def post(self, request):
        VALID_USER_FIELDS = [f.name for f in get_user_model()._meta.fields]
        DEFAULTS = {
            # you can define any defaults that you would like for the user, here
        }
        serialized = UserSerializer(data=request.data)
        if serialized.is_valid():
            user_data = {field: data for (field, data) in request.data.items() if field in VALID_USER_FIELDS}
            user_data.update(DEFAULTS)
            user = get_user_model().objects.create_user(**user_data)
            return Response(UserSerializer(instance=user).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)
