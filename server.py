from os import name
import mysql.connector
import json
import datetime
import random
import tensorflow as tf
import pandas as pd
import numpy as np
from datetime import timedelta

from urllib import parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

class crud():
    def __init__(self):
        self.sesion = {'inicio': False, 'id':'None', 'usuario':'None', 'contra':'None'}
        self.conn = mysql.connector.connect(host = 'localhost', user = 'root', port = '3307', password = '', database = 'db_parque_vehicular_aviles_jenifer')
        if self.conn.is_connected():
            print('Conectado a la base de datos')
        else:
            print('No se pudo conectar a la base de datos')

    def generar_id(self, tabla):
        print(tabla)
        if tabla == 'campos':
            sql = 'SELECT MAX(idVehiculo) AS id FROM campos'
        resultado = self.ejecutar_mostrar_sql(sql)
        if resultado[0] == True:
            id = resultado[1][0]['id']
            if id == None:
                id = 0
            id = int(id) + 1
            return id
        else:
            return False

    def ejecutar_sql(self, sql, valores):
        try:
            cursor = self.conn.cursor()
            cursor.execute(sql, valores)
            self.conn.commit()
            print('Se ejecuto la consulta')
            return True
        except Exception as e:
            print(e)
            return False

    def ejecutar_mostrar_sql(self, sql):
        try:
            cursor = self.conn.cursor(dictionary=True)
            cursor.execute(sql)
            resultado = cursor.fetchall()
            if len(resultado) == 0:
                return False, resultado
            else:
                return True, resultado
        except Exception as e:
            print(e)
            return False

    def ejecutar_select_datos(self, sql, datos):
        try:
            cursor = self.conn.cursor(dictionary=True)
            cursor.execute(sql, datos)
            resultado = cursor.fetchall()
            if len(resultado) == 0:
                return False, resultado
            else:
                return True, resultado
        except Exception as e:
            print(e)
            return False

    def administrar_vehiculos(self, datos):
        if datos['accion'] == 'insertar':
            sql = 'INSERT INTO campo (idVehiculo, Marca, Modelo, year ( año), num_motor, Num_chasis) VALUES (%s, %s, %s, %s, %s, %s)'
            id = self.generar_id('campo')
            valores = (id, datos['Marca'], datos['Modelo'], datos['year ( año)'], datos['num_motor'], datos['Num_chasis'])
            if self.ejecutar_sql(sql, valores) == True:
                for genero in datos['generos']:
                    sql = 'INSERT INTO generocampo (idVehiculo) VALUES (%s)'
                    valores = (id, genero)
                    self.ejecutar_sql(sql, valores)
                return True, id
            else:
                return False
        
        elif datos['accion'] == 'actualizar':
            sql = 'UPDATE campo SET Marca = %s, Modelo = %s, year ( año) = %s, num_motor = %s, Imagen = %s, Num_chasis = %s WHERE idVehiculo = %s'
            valores = (datos['Marca'], datos['Modelo'], datos['year ( año)'], datos['num_motor'], datos['imagen'], datos['Num_chasis'], datos['id'])
            if self.ejecutar_sql(sql, valores) == True:
                sql = 'DELETE FROM generolibro WHERE idVehiculo = %s'
                valores = (datos['id'],)
                print(type(datos['id']))
                if self.ejecutar_sql(sql, valores) == True:
                    for genero in datos['generos']:
                        sql = 'INSERT INTO generolibro (idVehiculo, idGenero) VALUES (%s, %s)'
                        valores = (datos['id'], genero)
                        self.ejecutar_sql(sql, valores)
                    return True
            else:
                return False

        elif datos['accion'] == 'eliminar':
            sql = 'DELETE FROM generolibro WHERE idVehiculo = %s'
            valores = (datos['id'],)
            if self.ejecutar_sql(sql, valores) == True:
                sql = 'DELETE FROM campo WHERE idVehiculo = %s'
                valores = (datos['id'],)
                if self.ejecutar_sql(sql, valores) == True:
                    return True
                else:
                    return False


    def registro(self):
        if self.sesion['inicio'] == True:
            return True
        else:
            return False

    def admin(self):
        if self.sesion['tipo'] == 1:
            return True
        else:
            return False
        
    def salir(self):
        self.sesion['inicio'] = False
        self.sesion['id'] = 'None'
        self.sesion['usuario'] = 'None'
        self.sesion['tipo'] = 'None'
        self.sesion['contra'] = 'None'
        if self.sesion['inicio'] == False:
            return True
        else:
            return False

    def administrar_sesion(self, datos):
        sql = 'SELECT * FROM campo WHERE Nickname = %s AND Contraseña = %s'
        valores = (datos['usuario'], datos['contra'])
        resultado = self.ejecutar_select_datos(sql, valores)
        if resultado[0] == True:
            self.sesion['inicio'] = True
            self.sesion['id'] = resultado[1][0]['idUsuario']
            self.sesion['usuario'] = resultado[1][0]['Nickname']
            self.sesion['tipo'] = resultado[1][0]['idTipo']
            self.sesion['contra'] = resultado[1][0]['Contraseña']
            return True
        else:
            return False

print('Iniciando servidor')
httpd = HTTPServer(('localhost', 3000), servidorBasico)
httpd.serve_forever()