"""
Migration script to add the post_job_action_association table.
"""
import datetime
import logging

from sqlalchemy import Column, ForeignKey, Integer, MetaData, Table

now = datetime.datetime.utcnow
log = logging.getLogger( __name__ )
metadata = MetaData()

PostJobActionAssociation_table = Table("post_job_action_association", metadata,
                                       Column("id", Integer, primary_key=True),
                                       Column("post_job_action_id", Integer, ForeignKey("post_job_action.id"), index=True, nullable=False),
                                       Column("job_id", Integer, ForeignKey("job.id"), index=True, nullable=False))


def upgrade(migrate_engine):
    metadata.bind = migrate_engine
    print __doc__
    metadata.reflect()
    try:
        PostJobActionAssociation_table.create()
    except Exception as e:
        log.debug( "Creating PostJobActionAssociation table failed: %s" % str( e ) )


def downgrade(migrate_engine):
    metadata.bind = migrate_engine
    # Load existing tables
    metadata.reflect()
    try:
        PostJobActionAssociation_table.drop()
    except Exception as e:
        log.debug( "Dropping PostJobActionAssociation table failed: %s" % str( e ) )
