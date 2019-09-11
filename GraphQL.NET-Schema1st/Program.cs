using System;
using GraphQL;
using GraphQL.Types;

namespace GraphQL_Schema1st
{
    public class Droid
    {
        public string Id {get;set;}
        public string Name {get;set;}
    }

    public class Query {
        [GraphQLMetadata("hero")]
        public Droid GetHero() {
            return new Droid { Id = "1", Name = "R2-D2"};
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
                }

                type Query {
                    hero: Droid
                }
            ", _ => {
                _.Types.Include<Query>();
            });

            var json = schema.Execute(_ => {
                _.Query = "{ hero { id name } }";
            });

            Console.WriteLine(json);
        }
    }
}
