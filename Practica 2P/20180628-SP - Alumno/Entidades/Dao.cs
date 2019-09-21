using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace Entidades
{
    public class Dao   
    {
        SqlConnection conexion;
        SqlCommand comando;

        public Dao()
        {
            conexion = new SqlConnection("Data Source=.\\SQLEXPRESS;Initial Catalog=votacion-sp-2018;Integrated Security=True");
            comando = new SqlCommand();
            comando.CommandType = System.Data.CommandType.Text;
            comando.Connection = conexion;
        }

        public void Guardar(Votacion objecto)
        {
            comando.CommandText = "INSERT INTO Votaciones (nombreLey, afirmativos, negativos, abstenciones, nombreAlumno) VALUES('" + objecto.NombreLey + "', '" + objecto.ContadoAfirmativo + "', '" + objecto.ContadorNegativo + "', '" + objecto.ContadorAbstencion + "', 'Nicolas.Mazzoconi')";
            conexion.Open();
            comando.ExecuteNonQuery();
            conexion.Close();
        }

        public void Leer()
        {
            throw new NotImplementedException();
        }
    }
}
