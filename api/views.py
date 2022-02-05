from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import Note
from .serializers import NoteSerializer
from .utils import updateNote, getNoteDetail, deleteNote, getNotesList, createNote

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint':'/notes',
            'method': 'GET',
            'body': None,
            'description': 'Retorna um array de notas'
        },
        {
            'Endpoint':'/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Retorna uma nota'
        },
        {
            'Endpoint':'/notes',
            'method': 'POST',
            'body': {'body':""},
            'description': 'Cria uma nova nota'
        },
        {
            'Endpoint':'/notes/id',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Atualiza uma nota com o id especificado'
        },
        {
            'Endpoint':'/notes/id',
            'method': 'DELETE',
            'body': None,
            'description': 'Deleta a nota especificada'
        },
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
def getNotes(request):
    if request.method == 'GET':
        return getNotesList(request)

    if request.method == 'POST':
        return createNote(request)


@api_view(['GET', 'PUT', 'DELETE'])
def getNote(request, pk):
    if request.method == 'GET':
        return getNoteDetail(request, pk)

    if request.method == 'PUT':
        return updateNote(request,pk)
    
    if request.method == 'DELETE':
        return deleteNote(request, pk)

