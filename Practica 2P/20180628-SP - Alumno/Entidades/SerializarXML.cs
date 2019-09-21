using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Xml.Serialization;
using System.Xml;

namespace Entidades
{
    public class SerializarXML<T> : IArchivo<T>
    {
        public bool Guardar(string rutaArchivo, T objecto)
        {
            XmlTextWriter xtw = null;
            try
            {
                xtw = new XmlTextWriter(rutaArchivo, Encoding.UTF8);
                XmlSerializer ser = new XmlSerializer(typeof(T));
                ser.Serialize(xtw, objecto);
                xtw.Close();
                return true;
            }catch(Exception ex)
            {
                throw new ErrorArchivoException(ex.Message);
            }
            finally
            {
                if(xtw != null)
                    xtw.Close();
            }
        }

        public T Leer(string rutaArchivo)
        {
            try
            {
                XmlTextReader xtr = new XmlTextReader(rutaArchivo);
                XmlSerializer ser = new XmlSerializer(typeof(T));
                T aux = (T)ser.Deserialize(xtr);
                return aux;
            }
            catch(Exception ex)
            {
                throw new ErrorArchivoException(ex.Message);
            }
        }
    }
}
