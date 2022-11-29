import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

export const GraphQLSettingModule = GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    context: ({ req, connectionParams }) => {
        return connectionParams ? { req: { ...req, headers: connectionParams.headers } } : { req };
    },
    subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true
      },
    typePaths: ['./**/*.graphql'],
    definitions: {
        path: `${process.cwd()}/src/graphql.ts`
    },
    playground: true,
});

