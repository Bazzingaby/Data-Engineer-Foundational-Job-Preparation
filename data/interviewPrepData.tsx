
import React from 'react';
import type { Topic } from '../types';
import { DatabricksIcon, SnowflakeIcon, SqlIcon, PythonIcon, DataModelingIcon, DataGovernanceIcon, ApiIcon, DevOpsIcon } from '../components/icons/TopicIcons';

export const topics: Topic[] = [
  {
    id: 'databricks',
    title: 'Databricks',
    icon: <DatabricksIcon />,
    content: {
      definition: 'Databricks is a unified, open analytics platform for building, deploying, sharing, and maintaining enterprise-grade data, analytics, and AI solutions at scale. It is built around Apache Spark and champions the "Lakehouse" architecture.',
      purpose: 'To provide a collaborative platform for data engineers, data scientists, and business analysts to work together on big data and machine learning projects. It simplifies big data processing and abstracts away the complexities of managing Spark clusters.',
      architecture: [
        { title: 'Control Plane', description: 'Hosted by Databricks in their cloud account. Manages the workspace, notebooks, jobs, and cluster manager. This is the "brain" of the operation.' },
        { title: 'Data Plane', description: 'Resides in the customer’s cloud account (AWS/Azure/GCP). This is where data is processed by Spark clusters. Data never leaves the customer’s network, ensuring security.' },
        { title: 'Delta Lake', description: 'An open-source storage layer that brings ACID transactions, scalable metadata handling, and unified streaming and batch data processing to data lakes.' },
        { title: 'Workspace', description: 'The collaborative UI that provides notebooks, dashboards, a SQL editor, and an environment for data exploration and MLOps.' },
      ],
      keyPoints: [
        '<strong>Unified Analytics:</strong> Combines data engineering, data science, and business analytics on a single platform.',
        '<strong>Apache Spark-based:</strong> Leverages the power of Spark for high-performance, distributed computing.',
        '<strong>Collaborative Notebooks:</strong> Supports multiple languages (Python, SQL, Scala, R) in a single notebook.',
        '<strong>Lakehouse Architecture:</strong> Uses Delta Lake to provide data warehousing capabilities (reliability, performance) directly on your data lake.',
        '<strong>Managed Infrastructure:</strong> Automates cluster management, scaling, and termination, reducing operational overhead.',
      ],
      mindMap: {
        name: 'Databricks',
        children: [
          { name: 'Core Components', children: [{ name: 'Apache Spark Engine' }, { name: 'Delta Lake' }, { name: 'Workspace (Notebooks, Jobs)' }] },
          { name: 'Architecture', children: [{ name: 'Control Plane (Databricks)' }, { name: 'Data Plane (Customer Cloud)' }] },
          { name: 'Key Concepts', children: [{ name: 'Lakehouse' }, { name: 'Medallion Architecture' }, { name: 'Unity Catalog' }] },
          { name: 'Features', children: [{ name: 'Unified Platform' }, { name: 'Collaboration' }, { name: 'Auto-scaling Clusters' }, { name: 'MLflow Integration' }] },
        ],
      },
      details: [
        {
          title: 'Databricks, Spark, & Python Fundamentals',
          content: [
            '<strong>Architecture Understanding:</strong> At its core, Databricks uses Apache Spark. Spark distributes data processing tasks across a cluster of computers. For data engineers, PySpark DataFrames are the primary tool. They are immutable, distributed collections of data organized into named columns.',
            '<strong>Lazy Evaluation:</strong> Spark uses lazy evaluation. Transformations (e.g., `select`, `filter`, `join`) are not executed immediately. Instead, Spark builds a Directed Acyclic Graph (DAG) of transformations. An action (e.g., `show`, `count`, `write`) triggers the execution of the DAG.',
            '<strong>Medallion Architecture:</strong> A common data modeling pattern in Databricks. Data flows through Bronze (raw), Silver (cleaned, filtered), and Gold (business-level aggregates) tables.'
          ],
          code: [
            {
              language: 'PySpark',
              title: 'Basic ETL with PySpark and Delta Lake',
              snippet: `
# Reading raw data (Bronze Layer)
df = spark.read.format("json").load("/mnt/raw/events/2024-01-01.json")

# Applying transformations (Silver Layer)
from pyspark.sql.functions import col, from_unixtime

transformed_df = df.filter(col('event_type') == 'purchase') \\
  .withColumn("timestamp", from_unixtime(col("ts"))) \\
  .select("user_id", "product_id", "price", "timestamp")

# Writing the transformed data to a cleaned Delta table
transformed_df.write.format("delta") \\
  .mode("overwrite") \\
  .saveAsTable("events_silver")
`,
            },
            {
              language: 'PySpark',
              title: 'Window Function in PySpark',
              snippet: `
from pyspark.sql import Window
from pyspark.sql.functions import rank

# Find the top 3 selling products per category
windowSpec  = Window.partitionBy("category").orderBy(col("sales").desc())

top_products_df = sales_df.withColumn("rank", rank().over(windowSpec)) \\
  .filter(col("rank") <= 3)

top_products_df.show()
              `,
            },
          ],
        },
        {
            title: 'Delta Lake - The Core of the Lakehouse',
            content: [
                "<strong>ACID Transactions:</strong> Delta Lake brings the reliability of databases to your data lake. This prevents data corruption from failed jobs and allows multiple users to read and write to the same table concurrently.",
                "<strong>Time Travel:</strong> You can query previous versions of a Delta table, which is invaluable for debugging, auditing, or rolling back bad writes.",
                "<strong>MERGE Statement:</strong> The `MERGE` command is a cornerstone for ETL/ELT, allowing you to perform `UPSERT` operations efficiently. This is critical for implementing Slowly Changing Dimensions (SCD Type 2)."
            ],
            code: [
                {
                    language: 'SQL',
                    title: 'SCD Type 2 using MERGE in Delta Lake',
                    snippet: `
MERGE INTO customers_silver AS target
USING customer_updates AS source
ON target.customer_id = source.customer_id
-- When a customer's details have changed and they are currently active
WHEN MATCHED AND target.is_current = true AND target.address <> source.address THEN
  UPDATE SET target.is_current = false, target.end_date = source.update_timestamp -- Expire the old record
-- Then, insert the new, updated record for that customer
WHEN MATCHED AND target.is_current = true AND target.address <> source.address THEN
  INSERT (customer_id, address, is_current, start_date, end_date)
  VALUES (source.customer_id, source.address, true, source.update_timestamp, null)
-- When a new customer is found in the source
WHEN NOT MATCHED THEN
  INSERT (customer_id, address, is_current, start_date, end_date)
  VALUES (source.customer_id, source.address, true, source.update_timestamp, null)
                    `
                }
            ]
        }
      ],
    },
  },
  {
    id: 'snowflake',
    title: 'Snowflake',
    icon: <SnowflakeIcon />,
    content: {
      definition: 'Snowflake is a cloud-native data platform that provides a "Data Cloud" for data storage, processing, and analytics. It is delivered as a Software-as-a-Service (SaaS) and is known for its unique decoupled storage and compute architecture.',
      purpose: 'To provide a highly scalable, flexible, and easy-to-use data warehouse-as-a-service, eliminating the need for traditional data warehouse hardware and management. It enables secure data sharing and a modern approach to data analytics.',
      architecture: [
        { title: 'Centralized Storage Layer', description: 'The foundation of Snowflake. All data is stored in a single, centralized location in the cloud (S3, Blob Storage, GCS), optimized into a columnar format called micro-partitions.' },
        { title: 'Multi-Cluster Compute Layer', description: 'The "muscle" of Snowflake. Queries are executed by "Virtual Warehouses," which are independent clusters of compute resources. Different warehouses can access the same data without competing for resources.' },
        { title: 'Cloud Services Layer', description: 'The "brain" of Snowflake. This layer coordinates the entire system, managing query optimization, security, metadata, and transaction management. It\'s completely managed by Snowflake.' },
      ],
      keyPoints: [
        '<strong>Decoupled Storage and Compute:</strong> Scale storage and compute resources independently and elastically.',
        '<strong>Multi-cluster, Shared Data Architecture:</strong> Different teams can query the same data without performance contention.',
        '<strong>Time Travel & Zero-Copy Cloning:</strong> Powerful features for data recovery and creating instant dev/test environments without duplicating data.',
        '<strong>Secure Data Sharing:</strong> Share live, queryable data with other Snowflake accounts without copying it.',
        '<strong>Near-Zero Maintenance:</strong> As a SaaS offering, Snowflake handles most of the tuning, management, and maintenance automatically.',
      ],
      mindMap: {
        name: 'Snowflake',
        children: [
          { name: 'Architecture Layers', children: [{ name: 'Cloud Services' }, { name: 'Virtual Warehouse (Compute)' }, { name: 'Centralized Storage' }] },
          { name: 'Key Concepts', children: [{ name: 'Separation of Compute/Storage' }, { name: 'Virtual Warehouses' }, { name: 'Micro-partitions' }] },
          { name: 'Unique Features', children: [{ name: 'Time Travel' }, { name: 'Zero-Copy Cloning' }, { name: 'Secure Data Sharing' }, { name: 'Streams & Tasks' }] },
          { name: 'Performance', children: [{ name: 'Clustering Keys' }, { name: 'Result Cache' }, { name: 'Warehouse Sizing' }] },
        ],
      },
      details: [
        {
          title: 'Snowflake Architecture Advantages & Optimization',
          content: [
            '<strong>Advantages of Architecture:</strong> The separation of storage and compute is revolutionary. It means the data loading (ETL) team can use a massive warehouse without affecting the BI team running reports on a smaller warehouse, even though they are accessing the same, single copy of the data. This eliminates resource contention common in traditional systems.',
            '<strong>Performance Optimization Techniques:</strong>',
            '1. <strong>Right-Sizing Virtual Warehouses:</strong> Start small (e.g., X-Small) and scale up if query performance is slow. For large data loads, a larger warehouse can be faster and more cost-effective.',
            '2. <strong>Clustering Keys:</strong> For very large tables (terabytes), define a clustering key on columns frequently used in `WHERE` clauses or `JOIN` conditions. This co-locates similar data in the same micro-partitions, allowing Snowflake to prune (skip) partitions it doesn\'t need to scan.',
            '3. <strong>Query Profile:</strong> Use the Query Profile in the UI to analyze query execution plans. Look for bottlenecks like "table scans" on large tables or "exploding joins".',
            '4. <strong>Leverage Caching:</strong> Snowflake has multiple layers of caching. The Result Cache is particularly powerful; if the same query is run again and the underlying data hasn\'t changed, the result is returned instantly without using compute credits.',
          ],
        },
        {
          title: 'Common Interview Code Scenarios',
          content: [
            "<strong>Time Travel:</strong> A key feature to know. It allows you to query data as it existed at a specific point in the past. It's used for recovering from accidental `UPDATE` or `DELETE` operations without restoring from a backup.",
            "<strong>Change Data Capture with Streams & Tasks:</strong> This is a very common data engineering pattern. A `STREAM` object captures all DML changes (inserts, updates, deletes) made to a table. A `TASK` can then be scheduled to run periodically and process only the new changes from the stream, enabling efficient incremental ETL.",
            "<strong>Zero-Copy Cloning:</strong> You will be asked about this. It allows you to create a complete copy of a table, schema, or entire database almost instantly, without duplicating the underlying storage. This is extremely powerful for creating dev/test environments."
          ],
          code: [
            {
              language: 'SQL',
              title: 'Querying Past Data with Time Travel',
              snippet: `
-- Oops, we accidentally updated all salaries!
UPDATE employees SET salary = salary * 1.1;

-- We can find the query ID from the query history
SET query_id = '01b1a3f5-0601-3e35-0000-00021c7a10e1';

-- Recover the table to its state right before the bad query was run
CREATE OR REPLACE TABLE employees_restored AS
SELECT * FROM employees BEFORE(statement => $query_id);

-- Alternatively, query at a specific timestamp
SELECT * FROM employees AT(timestamp => '2024-01-15 10:30:00'::timestamp);
`,
            },
            {
              language: 'SQL',
              title: 'Incremental ETL with Streams and Tasks',
              snippet: `
-- 1. Create a stream on the raw source table to track changes
CREATE OR REPLACE STREAM raw_sales_stream ON TABLE raw_sales_table;

-- 2. Create a task to process the changes from the stream every 5 minutes
CREATE OR REPLACE TASK process_sales_task
  WAREHOUSE = my_wh
  SCHEDULE = '5 MINUTE'
WHEN
  SYSTEM$STREAM_HAS_DATA('raw_sales_stream')
AS
  -- MERGE new/updated records into the production table
  MERGE INTO production_sales p
  USING raw_sales_stream s
  ON p.sale_id = s.sale_id
  WHEN MATCHED AND s.METADATA$ACTION = 'INSERT' THEN
    UPDATE SET p.amount = s.amount, p.updated_at = CURRENT_TIMESTAMP()
  WHEN NOT MATCHED AND s.METADATA$ACTION = 'INSERT' THEN
    INSERT (sale_id, amount, created_at, updated_at)
    VALUES (s.sale_id, s.amount, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

-- 3. Don't forget to resume the task
ALTER TASK process_sales_task RESUME;
`
            }
          ],
        },
      ],
    },
  },
  {
    id: 'sql',
    title: 'SQL Querying',
    icon: <SqlIcon />,
    content: {
      definition: 'Structured Query Language (SQL) is a standard language for storing, manipulating, and retrieving data in relational databases.',
      purpose: 'To interact with and manage data stored in a Relational Database Management System (RDBMS). It is the fundamental language for data professionals.',
      architecture: [
        { title: 'Data Definition Language (DDL)', description: 'Commands like `CREATE`, `ALTER`, `DROP` to define and manage the database schema and objects.' },
        { title: 'Data Manipulation Language (DML)', description: 'Commands like `INSERT`, `UPDATE`, `DELETE` to modify the data stored within tables.' },
        { title: 'Data Query Language (DQL)', description: 'The `SELECT` statement, used to retrieve data from the database. This is the most frequently used part of SQL.' },
        { title: 'Data Control Language (DCL)', description: 'Commands like `GRANT`, `REVOKE` to manage user access and permissions to the data.' },
      ],
      keyPoints: [
        '<strong>Declarative Language:</strong> You specify *what* data you want, not *how* to get it. The database engine figures out the execution plan.',
        '<strong>Set-based Operations:</strong> SQL operates on entire sets of rows, not one row at a time (like in procedural languages).',
        '<strong>Importance of JOINs:</strong> Combining data from multiple tables is a core strength. Understand `INNER`, `LEFT`, `RIGHT`, and `FULL OUTER` joins.',
        '<strong>Window Functions:</strong> Extremely powerful for complex analytical queries (ranking, moving averages, cumulative sums) without collapsing rows like `GROUP BY`.',
        '<strong>Common Table Expressions (CTEs):</strong> Use the `WITH` clause to improve readability and modularity of complex queries.',
      ],
      mindMap: {
        name: 'SQL',
        children: [
          { name: 'Language Subsets', children: [{ name: 'DDL' }, { name: 'DML' }, { name: 'DQL' }, { name: 'DCL' }] },
          { name: 'Core Concepts', children: [{ name: 'JOINs (INNER, LEFT, RIGHT, FULL)' }, { name: 'GROUP BY / HAVING' }, { name: 'Subqueries' }] },
          { name: 'Advanced Concepts', children: [{ name: 'Window Functions' }, { name: 'CTEs' }, { name: 'Pivoting' }, { name: 'Indexing' }] },
          { name: 'Optimization', children: [{ name: 'Explain Plan' }, { name: 'Indexing' }, { name: 'SARGable Queries' }, { name: 'Avoid SELECT *' }] },
        ],
      },
      details: [
        {
          title: 'SQL Concepts & Optimization',
          content: [
              '<strong>Key Concepts for Interviews:</strong>',
              '- <strong>Window Functions:</strong> Be comfortable with `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LAG()`, `LEAD()`, and aggregate window functions (`SUM() OVER (...)`). They are extremely common in analytical interviews.',
              '- <strong>CTEs (Common Table Expressions):</strong> Understand how to use the `WITH` clause to break down complex problems into logical, readable steps.',
              '- <strong>`GROUP BY` vs. `PARTITION BY`:</strong> `GROUP BY` aggregates rows into a single output row, whereas `PARTITION BY` is used with window functions to define a "window" of rows to operate on, without collapsing them.',
              '<strong>Optimization Techniques:</strong>',
              '- <strong>SARGable Predicates:</strong> Ensure your `WHERE` clause conditions are "Search ARGument-able". This means avoiding functions on indexed columns (e.g., `WHERE YEAR(order_date) = 2023` is bad; `WHERE order_date >= \'2023-01-01\' AND order_date < \'2024-01-01\'` is good) as it allows the database to use an index.',
              '- <strong>`EXPLAIN` Plan:</strong> The most crucial optimization tool. Learn to read the query execution plan to identify bottlenecks like full table scans or inefficient join methods.',
          ],
        },
        {
          title: 'Classic SQL Interview Problems',
          content: [
            "You should be prepared to solve a few classic problems live. Practice writing them out and explaining your logic clearly."
          ],
          code: [
            {
              language: 'SQL',
              title: 'Find the Second Highest Salary',
              snippet: `
WITH RankedSalaries AS (
  SELECT
    employee_name,
    salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) as salary_rank
  FROM employees
)
SELECT
  employee_name,
  salary
FROM RankedSalaries
WHERE salary_rank = 2;
`,
            },
            {
              language: 'SQL',
              title: 'Cumulative Sum of Monthly Sales',
              snippet: `
SELECT
  sale_month,
  monthly_total,
  SUM(monthly_total) OVER (ORDER BY sale_month) AS cumulative_total
FROM (
  SELECT
    DATE_TRUNC('month', sale_date) AS sale_month,
    SUM(sale_amount) as monthly_total
  FROM sales
  GROUP BY 1
) AS monthly_sales
ORDER BY 1;
`
            },
            {
              language: 'SQL',
              title: 'Find Users with 3 Consecutive Logins',
              snippet: `
WITH UserLoginDates AS (
  -- Get distinct login dates for each user
  SELECT DISTINCT user_id, login_date::date
  FROM logins
),
LaggedLogins AS (
  SELECT
    user_id,
    login_date,
    LAG(login_date, 1) OVER (PARTITION BY user_id ORDER BY login_date) as prev_day_1,
    LAG(login_date, 2) OVER (PARTITION BY user_id ORDER BY login_date) as prev_day_2
  FROM UserLoginDates
)
SELECT DISTINCT user_id
FROM LaggedLogins
WHERE
  login_date = prev_day_1 + INTERVAL '1 day'
  AND prev_day_1 = prev_day_2 + INTERVAL '1 day';
`
            }
          ],
        },
      ],
    },
  },
  {
    id: 'python',
    title: 'Python Scripting',
    icon: <PythonIcon />,
    content: {
      definition: 'Python is a high-level, interpreted programming language known for its clear syntax and readability. In data engineering, it\'s the de-facto language for scripting, automation, and interacting with data platforms.',
      purpose: 'To write ETL scripts, automate data workflows, perform data manipulation, interact with APIs, and build data pipelines. Libraries like Pandas, PySpark, and Requests make it incredibly powerful for data tasks.',
      architecture: [
        { title: 'Core Language', description: 'Data structures (lists, dicts, sets, tuples), control flow, functions, and classes form the foundation.' },
        { title: 'Standard Library', description: 'Built-in modules for common tasks like file I/O (`os`, `csv`), data handling (`json`, `datetime`), and networking.' },
        { title: 'Third-party Libraries', description: 'The vast ecosystem is key for DEs: Pandas (in-memory analysis), PySpark (distributed computing), Requests (APIs), SQLAlchemy (databases).' },
      ],
      keyPoints: [
        '<strong>Versatility:</strong> Used for everything from simple automation scripts to complex distributed data processing.',
        '<strong>Strong Libraries:</strong> A rich ecosystem of libraries specifically for data makes development fast and efficient.',
        '<strong>Readability:</strong> Clean syntax makes code easier to write, debug, and maintain, which is crucial for production data pipelines.',
        '<strong>"Glue" Language:</strong> Acts as the connector between various systems, databases, and APIs in a data stack.',
      ],
      mindMap: {
        name: 'Python for DE',
        children: [
          { name: 'Core Concepts', children: [{ name: 'Data Structures' }, { name: 'Functions / Classes' }, { name: 'Error Handling' }] },
          { name: 'Key Libraries', children: [{ name: 'Pandas' }, { name: 'PySpark' }, { name: 'Requests' }, { name: 'SQLAlchemy' }] },
          { name: 'Common Tasks', children: [{ name: 'ETL Scripts' }, { name: 'API Interaction' }, { name: 'Workflow Automation' }, { name: 'Data Cleaning' }] },
          { name: 'Best Practices', children: [{ name: 'Virtual Environments' }, { name: 'PEP 8 Styling' }, { name: 'Unit Testing' }] },
        ],
      },
      details: [
        {
            title: "Python Logic & Knowledge Checks",
            content: [
                "Interview questions often test fundamental understanding of data structures and algorithms, applied to a data context.",
                "<strong>Example Logic Question:</strong> Given a list of log entries, where each entry is a dictionary like `{'user_id': 123, 'action': 'login', 'timestamp': ...}`, find all users who performed a 'login' action followed by a 'logout' action within 5 minutes. This tests your ability to handle lists of dictionaries, parse timestamps, and implement stateful logic."
            ],
            code: [
                {
                    language: "Python",
                    title: "User Session Logic Example",
                    snippet: `
from datetime import datetime, timedelta

def find_sessions(logs):
    user_logins = {}
    successful_sessions = set()

    # Sort logs by timestamp to process in chronological order
    logs.sort(key=lambda x: x['timestamp'])

    for log in logs:
        user_id = log['user_id']
        action = log['action']
        timestamp = log['timestamp']

        if action == 'login':
            # Store the latest login time for a user
            user_logins[user_id] = timestamp
        
        elif action == 'logout' and user_id in user_logins:
            login_time = user_logins[user_id]
            if timestamp - login_time <= timedelta(minutes=5):
                successful_sessions.add(user_id)
            
            # Important: remove login time after processing a logout 
            # to correctly handle multiple sessions for the same user.
            del user_logins[user_id]
            
    return list(successful_sessions)

# Sample Data
logs = [
    {'user_id': 1, 'action': 'login', 'timestamp': datetime(2023, 1, 1, 10, 0, 0)},
    {'user_id': 2, 'action': 'login', 'timestamp': datetime(2023, 1, 1, 10, 1, 0)},
    {'user_id': 1, 'action': 'logout', 'timestamp': datetime(2023, 1, 1, 10, 4, 0)}, # Success (4 mins)
    {'user_id': 2, 'action': 'logout', 'timestamp': datetime(2023, 1, 1, 10, 7, 0)}, # Fails (6 mins)
    {'user_id': 3, 'action': 'login', 'timestamp': datetime(2023, 1, 1, 10, 10, 0)}, # No logout
]

print(find_sessions(logs)) # Expected output: [1]
`
                }
            ]
        }
    ]
    },
  },
    {
    id: 'data-modeling',
    title: 'Data Modeling',
    icon: <DataModelingIcon />,
    content: {
      definition: 'Data modeling is the process of creating a visual representation of a data system. It defines how data is stored, organized, and related to other data, serving as the blueprint for database design.',
      purpose: 'To ensure data consistency, reduce redundancy, and create an efficient and scalable database schema. A good data model is the foundation for any robust data warehouse or database.',
      architecture: [
        { title: 'Conceptual Model', description: 'A high-level view of the business concepts and rules. Technology-agnostic and focused on business understanding.' },
        { title: 'Logical Model', description: 'More detailed than the conceptual model. Defines entities, attributes, and relationships (e.g., an Entity-Relationship Diagram) without specifying a particular database technology.' },
        { title: 'Physical Model', description: 'The actual implementation of the database design for a specific RDBMS. Defines tables, columns, data types, indexes, and constraints.' },
      ],
      keyPoints: [
        '<strong>Normalization (OLTP):</strong> The process of organizing columns and tables in a relational database to minimize data redundancy. Typically used for transactional systems.',
        '<strong>Dimensional Modeling (OLAP):</strong> A design methodology optimized for data warehousing and analytics. Uses Star or Snowflake schemas.',
        '<strong>Star Schema:</strong> The most common dimensional model. A central fact table (containing measures) is connected to multiple dimension tables (containing context).',
        '<strong>Facts and Dimensions:</strong> Facts are measurable events (e.g., sales amount). Dimensions provide the context (e.g., product, date, customer).',
        '<strong>Slowly Changing Dimensions (SCD):</strong> Techniques to manage changes in dimension attributes over time. Be ready to explain Type 1 (overwrite), Type 2 (add new row), and Type 3 (add new column).',
      ],
      mindMap: {
        name: 'Data Modeling',
        children: [
          { name: 'Model Types', children: [{ name: 'Conceptual' }, { name: 'Logical' }, { name: 'Physical' }] },
          { name: 'Warehouse Schemas', children: [{ name: 'Star Schema' }, { name: 'Snowflake Schema' }, { name: 'Galaxy Schema' }] },
          { name: 'Key Components', children: [{ name: 'Fact Tables' }, { name: 'Dimension Tables' }] },
          { name: 'Important Concepts', children: [{ name: 'Normalization (3NF)' }, { name: 'Slowly Changing Dimensions (SCDs)' }, { name: 'Granularity' }] },
        ],
      },
    },
  },
  {
    id: 'data-governance',
    title: 'Data Governance',
    icon: <DataGovernanceIcon />,
    content: {
      definition: 'Data governance is a collection of processes, roles, policies, standards, and metrics that ensure the effective and efficient use of information in enabling an organization to achieve its goals.',
      purpose: 'To ensure data is high-quality, secure, discoverable, and used consistently and correctly across the organization. It establishes accountability for data and builds trust.',
      architecture: [
        { title: 'Policies & Standards', description: 'The rules defining how data should be managed, accessed, and used.' },
        { title: 'Data Stewardship', description: 'Assigning ownership and accountability for specific data assets to individuals or teams (Data Stewards/Owners).' },
        { title: 'Data Quality Framework', description: 'Processes and tools to measure, monitor, and improve the accuracy, completeness, and consistency of data.' },
        { title: 'Data Catalog & Lineage', description: 'A Data Catalog provides an inventory of data assets, making them discoverable. Data Lineage tracks the flow of data from source to destination.' },
      ],
      keyPoints: [
        'It is about <strong>people, processes, and technology</strong> working together.',
        'Establishes clear roles like Data Owners and Data Stewards to create accountability.',
        'Key for compliance with regulations like GDPR and CCPA.',
        '<strong>Data Lineage</strong> is critical for impact analysis (what will break if I change this?) and root cause analysis (where did this bad data come from?).',
        'A <strong>Data Catalog</strong> provides metadata and context, enabling data as a self-service asset.',
      ],
      mindMap: {
        name: 'Data Governance',
        children: [
          { name: 'Pillars', children: [{ name: 'Data Quality' }, { name: 'Data Security' }, { name: 'Master Data Mgmt' }, { name: 'Metadata Mgmt' }] },
          { name: 'Key Roles', children: [{ name: 'Data Owner' }, { name: 'Data Steward' }, { name: 'Data Custodian' }] },
          { name: 'Core Processes', children: [{ name: 'Data Cataloging' }, { name: 'Data Lineage Tracking' }, { name: 'Policy Enforcement' }] },
          { name: 'Business Drivers', children: [{ name: 'Regulatory Compliance' }, { name: 'Risk Management' }, { name: 'Improved Decision Making' }] },
        ],
      },
    },
  },
    {
    id: 'api',
    title: 'APIs',
    icon: <ApiIcon />,
    content: {
      definition: 'An Application Programming Interface (API) is a set of rules and protocols that allows different software applications to communicate with each other.',
      purpose: 'In data engineering, APIs are crucial for ingesting data from external sources (e.g., SaaS platforms, third-party services) and for exposing data products to other internal or external consumers.',
      architecture: [
        { title: 'REST (Representational State Transfer)', description: 'The most common architectural style. Uses standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`), is stateless, and typically uses JSON.' },
        { title: 'Authentication', description: 'Mechanisms to verify identity. Common methods include API Keys (sent in headers) and OAuth 2.0 (a more secure, token-based flow).' },
        { title: 'Pagination', description: 'A technique to retrieve large datasets in smaller chunks or "pages" instead of all at once, to avoid overwhelming the server or client.' },
        { title: 'Rate Limiting', description: 'A server-side control to limit the number of API requests a client can make in a given time period to prevent abuse.' },
      ],
      keyPoints: [
        'APIs are a primary method for <strong>data ingestion</strong> from modern applications.',
        'Understanding HTTP methods (`GET`, `POST`, etc.) and status codes (200, 404, 429, etc.) is essential.',
        'Handling authentication, pagination, and rate limiting are common challenges in ETL scripts that extract data from APIs.',
        '<strong>Idempotency</strong> is an important concept: making the same API call multiple times should produce the same result (e.g., a `PUT` request).',
      ],
      mindMap: {
        name: 'APIs',
        children: [
          { name: 'Types', children: [{ name: 'REST' }, { name: 'SOAP' }, { name: 'GraphQL' }, { name: 'Webhook' }] },
          { name: 'Core Concepts', children: [{ name: 'Endpoint' }, { name: 'Request/Response Cycle' }, { name: 'HTTP Methods' }, { name: 'Status Codes' }] },
          { name: 'Common Challenges', children: [{ name: 'Authentication' }, { name: 'Rate Limiting' }, { name: 'Pagination' }, { name: 'Error Handling' }] },
          { name: 'Usage in DE', children: [{ name: 'Data Ingestion' }, { name: 'Data Exposure' }, { name: 'System Integration' }] },
        ],
      },
    },
  },
  {
    id: 'devops',
    title: 'DevOps & CI/CD',
    icon: <DevOpsIcon />,
    content: {
      definition: 'DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality. CI/CD is a core part of DevOps.',
      purpose: 'To automate and streamline the process of building, testing, and deploying data pipelines and infrastructure, leading to faster, more reliable, and repeatable releases.',
      architecture: [
        { title: 'Continuous Integration (CI)', description: 'Developers regularly merge code changes into a central repository (e.g., Git), after which automated builds and tests are run. Goal is to find integration bugs early.' },
        { title: 'Continuous Delivery/Deployment (CD)', description: 'An extension of CI where code changes are automatically built, tested, and prepared for a release to production. Continuous Deployment automatically deploys every passed build.' },
        { title: 'Infrastructure as Code (IaC)', description: 'Managing and provisioning infrastructure (like databases, clusters, permissions) through code (e.g., Terraform, CloudFormation) instead of manual processes.' },
        { title: 'Key Tools', description: 'Git (Version Control), Jenkins/GitLab CI/Azure DevOps (CI/CD), Docker (Containerization), Terraform (IaC), dbt (Testing/Deployment).' },
      ],
      keyPoints: [
        'CI/CD for data pipelines involves testing SQL scripts, Python code, and deployment configurations.',
        '<strong>Version control (Git)</strong> for all code (SQL, Python, IaC) is non-negotiable.',
        '<strong>Automated testing</strong> is crucial: unit tests for Python functions, data quality/schema checks for data transformations (e.g., dbt tests).',
        '<strong>IaC</strong> allows for reproducible environments (dev, staging, prod), which is critical for preventing "it works on my machine" issues.',
        'The goal is to make releases <strong>boring and predictable</strong>.',
      ],
      mindMap: {
        name: 'DevOps for DE',
        children: [
          { name: 'Core Pillars', children: [{ name: 'CI (Continuous Integration)' }, { name: 'CD (Continuous Delivery/Deployment)' }, { name: 'IaC (Infrastructure as Code)' }] },
          { name: 'Toolchain', children: [{ name: 'Git' }, { name: 'Jenkins / GitLab CI' }, { name: 'Docker' }, { name: 'Terraform' }] },
          { name: 'Pipeline Stages', children: [{ name: 'Commit' }, { name: 'Build' }, { name: 'Automated Test' }, { name: 'Deploy' }] },
          { name: 'Benefits', children: [{ name: 'Faster Releases' }, { name: 'Improved Reliability' }, { name: 'Reproducible Environments' }, { name: 'Increased Collaboration' }] },
        ],
      },
    },
  },
];