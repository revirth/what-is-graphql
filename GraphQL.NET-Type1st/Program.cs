using System;
using GraphQL;
using GraphQL.Types;

namespace GraphQL_Type1st
{
    public class Droid 
    {
        public string Id {get;set;}
        public string Name {get;set;}
    }

    public class DroidType : ObjectGraphType<Droid>
    {
        public DroidType()
        {
            Field(x => x.Id).Description("The Id of the Droid.");
            Field(x => x.Name).Description("The name of the Droid");
        }
    }

    public class StarWarsQuery : ObjectGraphType 
    {
        public StarWarsQuery()
        {
            Field<DroidType>("hero", resolve: context => new Droid { Id="1", Name="R2-D2"});
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var schema = new Schema { Query = new StarWarsQuery() };

            var json = schema.Execute(_ => {
                _.Query = "{ hero { id name } }";
            });

            System.Console.WriteLine(json);
        }
    }
}
