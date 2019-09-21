using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Entidades;
using System.Threading;

namespace TestUni
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void ErrorArchivo()
        {
            Votacion v = null;
            try
            {
                SerializarXML<Votacion> ser = new SerializarXML<Votacion>();
                ser.Guardar(null, v); //Le mando null al path para que rompa
            }
            catch(Exception ex)
            {
                Assert.IsInstanceOfType(ex, typeof(ErrorArchivoException));
            }
        }

        [TestMethod]
        public void EventoVotacion()
        {
            System.Collections.Generic.Dictionary<string, Votacion.EVoto> senadores = new System.Collections.Generic.Dictionary<string, Votacion.EVoto>();
            senadores.Add("0", Votacion.EVoto.Abstencion);
            senadores.Add("1", Votacion.EVoto.Abstencion);
            senadores.Add("2", Votacion.EVoto.Abstencion);
            senadores.Add("3", Votacion.EVoto.Abstencion);
            Votacion v = new Votacion("Nombre", senadores);
            v.EventoVotoEfectuado += Manejador;
            v.Simular();
            Assert.IsTrue(v.ContadoAfirmativo + v.ContadorAbstencion + v.ContadorNegativo == 4);
        }
        public void Manejador(string senador, Votacion.EVoto voto)
        { }
    }
}
