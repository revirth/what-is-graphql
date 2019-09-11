using System;
using GraphQL;
using GraphQL.Types;

namespace GraphQL_Schema1stNested
{
    public class Droid
    {
        public string Id { get; set; }
        public string Name {get;set;}
    } 

    public class Character {
        public string Name {get;set;}
    }

    public class Query 
    {
        [GraphQLMetadata("hero")]
        public Droid GetHero() 
        {
            return new Droid { Id="1", Name="R2-D2"};
        }
    }

    [GraphQLMetadata("Droid", IsTypeOf=typeof(Droid))]
    public class DroidType 
    {
        public string Id(Droid droid) => droid.Id;
        public string Name(Droid droid) => droid.Name;

        public Character Friend(ResolveFieldContext context, Droid source)
        {
            return new Character { Name = "C3-PO"};
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var schema = Schema.For(@"
                type Droid {
                    id: String!
                    name: String!
                    friend: Character
                }

                type Character {
                    name: String!
                }

                type Query {
                    hero: Droid
                }
            ", _ => {
                _.Types.Include<DroidType>();
                _.Types.Include<Query>();
            });
            
            var json = schema.Execute(_ => {
                _.Query = "{ hero { id name friend { name } } }";
            });

            System.Console.WriteLine(json);
        }
    }
}
