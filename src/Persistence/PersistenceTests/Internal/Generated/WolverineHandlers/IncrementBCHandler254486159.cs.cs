// <auto-generated/>
#pragma warning disable
using Wolverine.Marten.Publishing;

namespace Internal.Generated.WolverineHandlers
{
    // START: IncrementBCHandler254486159
    public class IncrementBCHandler254486159 : Wolverine.Runtime.Handlers.MessageHandler
    {
        private readonly Wolverine.Marten.Publishing.OutboxedSessionFactory _outboxedSessionFactory;

        public IncrementBCHandler254486159(Wolverine.Marten.Publishing.OutboxedSessionFactory outboxedSessionFactory)
        {
            _outboxedSessionFactory = outboxedSessionFactory;
        }



        public override async System.Threading.Tasks.Task HandleAsync(Wolverine.Runtime.MessageContext context, System.Threading.CancellationToken cancellation)
        {
            var letterHandler = new PersistenceTests.Marten.LetterHandler();
            var incrementBC = (PersistenceTests.Marten.IncrementBC)context.Envelope.Message;
            await using var documentSession = _outboxedSessionFactory.OpenSession(context);
            var eventStore = documentSession.Events;
            // Loading Marten aggregate
            var eventStream = await eventStore.FetchForWriting<PersistenceTests.Marten.LetterAggregate>(incrementBC.LetterAggregateId, cancellation).ConfigureAwait(false);

            var outgoing1 = letterHandler.Handle(incrementBC, eventStream.Aggregate);
            if (outgoing1 != null)
            {
                // Capturing any possible events returned from the command handlers
                eventStream.AppendMany(outgoing1);

            }

            await documentSession.SaveChangesAsync(cancellation).ConfigureAwait(false);
        }

    }

    // END: IncrementBCHandler254486159
    
    
}

