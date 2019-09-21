using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class Votacion
    {
        public enum EVoto { Afirmativo, Negativo, Abstencion, Esperando }

        public delegate void Voto(string senador, Votacion.EVoto voto);
        public event Voto EventoVotoEfectuado;

        private string nombreLey;
        private Dictionary<string, EVoto> senadores;

        private short contadorAfirmativo;
        private short contadorNegativo;
        private short contadorAbstencion;

        public Votacion()
        {
        }

        public Votacion(string nombreLey, Dictionary<string, EVoto> senadores)
        {
            this.nombreLey = nombreLey;
            this.senadores = senadores;
        }

        public short ContadoAfirmativo
        {
            get
            {
                return contadorAfirmativo;
            }
            set
            {
                contadorAfirmativo = value;
            }
        }

        public short ContadorNegativo
        {
            get
            {
                return contadorNegativo;
            }
            set
            {
                contadorNegativo = value;
            }
        }

        public short ContadorAbstencion
        {
            get
            {
                return contadorAbstencion;
            }
            set
            {
                contadorAbstencion = value;
            }
        }

        public string NombreLey
        {
            get
            {
                return nombreLey;
            }
            set
            {
                nombreLey = value;
            }
        }

        public void Simular()
        {
            // Reseteo contadores
            this.contadorAbstencion = 0;
            this.contadorAfirmativo = 0;
            this.contadorNegativo = 0;
            // Itero todos los Senadores
            for (int index = 0; index < this.senadores.Count; index++)
            {
                // Duermo el hilo
                System.Threading.Thread.Sleep(100);

                // Leo el senador actual
                KeyValuePair<string, EVoto> k = this.senadores.ElementAt(index);
                // Generador de número aleatorio
                Random r = new Random(k.Key.ToString().Length + DateTime.Now.Millisecond);
                // Modifico el voto de forma aleatoria
                this.senadores[k.Key] = (EVoto)r.Next(0, 3);

                // Invocar Evento
                EventoVotoEfectuado.Invoke(k.Key, senadores[k.Key]);

                // Incrementar contadores
                if (senadores[k.Key] == EVoto.Abstencion)
                    this.contadorAbstencion++;
                else if (senadores[k.Key] == EVoto.Afirmativo)
                    this.contadorAfirmativo++;
                else if(senadores[k.Key] == EVoto.Negativo)
                    this.contadorNegativo++;
            }
        }
    }
}
